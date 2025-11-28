export default function handler(req, res) {
  const { id } = req.query || { id: "unknown" };

  // Log su console (puoi leggere su Vercel / deploy logs)
  console.log({
    id,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    userAgent: req.headers["user-agent"],
    timestamp: new Date().toISOString(),
  });

  // Pixel trasparente 1x1 (PNG in base64)
  const pixel = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
    "base64"
  );

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.status(200).end(pixel);
}
