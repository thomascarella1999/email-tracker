import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// pixel trasparente 1x1 in base64
const pixelBuffer = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
  "base64"
);

app.get("/pixel", (req, res) => {
  const id = req.query.id || "unknown";

  const entry = {
    id: id,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    userAgent: req.headers["user-agent"],
    timestamp: new Date().toISOString()
  };

  // salva su file JSON locale
  fs.appendFileSync("logs.txt", JSON.stringify(entry) + "\n");

  // restituisce il pixel
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.send(pixelBuffer);
});

app.listen(PORT, () => console.log(`Pixel server on ${PORT}`));
