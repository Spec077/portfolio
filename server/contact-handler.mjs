import { Resend } from "resend";
import { contactConfig, validateContactConfig } from "./contact-config.mjs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_SUBMIT_TIME_MS = 3_000;
const rateLimitStore = new Map();

function cleanupRateLimit(now) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
}

function checkRateLimit(key) {
  const now = Date.now();
  cleanupRateLimit(now);

  const current = rateLimitStore.get(key);

  if (!current || now - current.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return null;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return Math.ceil((RATE_LIMIT_WINDOW_MS - (now - current.windowStart)) / 1000);
  }

  current.count += 1;
  return null;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderMessageHtml(message) {
  return escapeHtml(message).replace(/\n/g, "<br />");
}

function buildEmailTemplate({ name, email, subject, message }) {
  const safeSubject = subject || "Not provided";

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; background:#0f1117; padding:24px; color:#f8fafc;">
      <div style="max-width:640px; margin:0 auto; background:#151925; border:1px solid rgba(255,255,255,0.08); border-radius:16px; overflow:hidden;">
        <div style="padding:20px 24px; background:linear-gradient(135deg, rgba(0,240,255,0.16), rgba(139,92,246,0.16)); border-bottom:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color:#9be7ef;">Portfolio Contact</p>
          <h2 style="margin:8px 0 0; font-size:24px; color:#ffffff;">New message from ${escapeHtml(name)}</h2>
        </div>
        <div style="padding:24px;">
          <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
            <tr>
              <td style="padding:8px 0; color:#94a3b8; width:88px;">Name</td>
              <td style="padding:8px 0; color:#ffffff;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#94a3b8;">Email</td>
              <td style="padding:8px 0; color:#ffffff;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#94a3b8;">Subject</td>
              <td style="padding:8px 0; color:#ffffff;">${escapeHtml(safeSubject)}</td>
            </tr>
          </table>
          <div style="border:1px solid rgba(255,255,255,0.08); border-radius:12px; background:#0b0f18; padding:16px;">
            <p style="margin:0 0 10px; color:#94a3b8; font-size:13px;">Message</p>
            <p style="margin:0; color:#e2e8f0; line-height:1.65;">${renderMessageHtml(message)}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function handleContactSubmission({
  body,
  requestKey,
}) {
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim();
  const subject = String(body?.subject || "").trim();
  const message = String(body?.message || "").trim();
  const company = String(body?.company || "").trim();
  const formStartedAt = Number(body?.formStartedAt || 0);

  if (company) {
    return { status: 200, payload: { success: true } };
  }

  if (!name || !email || !message) {
    return {
      status: 400,
      payload: { error: "Name, email, and message are required." },
    };
  }

  if (message.length > 500) {
    return {
      status: 400,
      payload: { error: "Message must be 500 characters or less." },
    };
  }

  if (!email.includes("@")) {
    return {
      status: 400,
      payload: { error: "Please enter a valid email address." },
    };
  }

  if (!formStartedAt || Date.now() - formStartedAt < MIN_SUBMIT_TIME_MS) {
    return {
      status: 400,
      payload: { error: "Submission was too fast. Please try again." },
    };
  }

  const retryAfter = checkRateLimit(requestKey || "anonymous");
  if (retryAfter !== null) {
    return {
      status: 429,
      payload: {
        error: "Too many contact requests. Please wait a few minutes and try again.",
        retryAfter,
      },
    };
  }

  if (!validateContactConfig()) {
    return {
      status: 500,
      payload: { error: "Server email configuration is missing." },
    };
  }

  try {
    const resend = new Resend(contactConfig.resendApiKey);
    const { error } = await resend.emails.send({
      from: contactConfig.contactFromEmail,
      to: [contactConfig.contactToEmail],
      subject: `Portfolio Contact: ${subject || "New message"}`,
      replyTo: email,
      html: buildEmailTemplate({ name, email, subject, message }),
    });

    if (error) {
      return {
        status: 500,
        payload: { error: error.message },
      };
    }

    return {
      status: 200,
      payload: { success: true },
    };
  } catch {
    return {
      status: 500,
      payload: { error: "Failed to send email." },
    };
  }
}
