import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

// Middleware: her istek route'a gelmeden önce bunlardan geçer.
app.use(cors());
app.use(express.json()); // body -> req.body

// Sunucu ayakta mı? Öğrenci numarası .env'den okunur.
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: process.env.STUDENT_NO ?? "2311012074",
  });
});

app.use("/events", eventRoutes);

// Hiçbir route eşleşmediyse buraya düşer.
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Hata yakalayıcı: 4 parametre olduğu için Express next(err)'i buraya gönderir.
// Kullanıcıya sadece kısa mesaj gider; ayrıntı terminalde kalır.
app.use((err, req, res, next) => {
  // Bozuk JSON gövdesi istemci hatasıdır.
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: { message: "Invalid JSON body" } });
  }
  console.error(err.message);
  res.status(500).json({ error: { message: "Server error" } });
});

export default app;
