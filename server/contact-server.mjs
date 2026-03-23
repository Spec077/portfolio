import http from "node:http";
import { handleContactSubmission } from "./contact-handler.mjs";

const port = Number(process.env.CONTACT_SERVER_PORT || 8787);

const json = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(payload));
};

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    return json(res, 404, { error: "Not found" });
  }

  if (req.method === "GET" && req.url === "/api/health") {
    return json(res, 200, { ok: true });
  }

  if (req.method !== "POST" || req.url !== "/api/contact") {
    return json(res, 404, { error: "Not found" });
  }

  let rawBody = "";

  req.on("data", (chunk) => {
    rawBody += chunk;

    if (rawBody.length > 1_000_000) {
      req.destroy();
    }
  });

  req.on("end", async () => {
    try {
      const body = JSON.parse(rawBody);
      const requestKey =
        req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        "anonymous";
      const result = await handleContactSubmission({
        body,
        requestKey,
      });
      return json(res, result.status, result.payload);
    } catch {
      return json(res, 400, { error: "Invalid JSON body" });
    }
  });
});

server.listen(port, () => {
  console.log(`Contact server running on http://localhost:${port}`);
});
