import express from "npm:express";
import fs from "fs";

const app = express();

// Pixel trasparente 1x1
const pixelBuffer = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
  "base64"
);

// Endpoint /pixel
app.get("/pixel", (req, res) => {
  const id = req.query.id || "unknown";

  // Log entry
  const entry = {
    id: id,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    userAgent: req.headers["user-agent"],
    timestamp: new Date().toISOString(),
  };

  // Salva su file locale (logs.txt)
  fs.appendFileSync("logs.txt", JSON.stringify(entry) + "\n");

  // Rispondi con pixel
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.send(pixelBuffer);
});

// **Export default** per Deno Deploy
export default app;
