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

export default app;
