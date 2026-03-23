import { handleContactSubmission } from "../server/contact-handler.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor?.split(",")[0]?.trim() || req.socket?.remoteAddress || "anonymous";

  const result = await handleContactSubmission({
    body: req.body,
    requestKey: ip,
  });

  return res.status(result.status).json(result.payload);
}
