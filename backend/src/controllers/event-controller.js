import mongoose from "mongoose";
import { Event } from "../models/event-model.js";

// Bu alanları istemci değiştiremez; MongoDB ya da Mongoose yönetir.
const KORUNAN_ALANLAR = ["_id", "createdAt", "updatedAt", "__v"];

// Geçersiz ya da olmayan id her yerde aynı 404'ü döner.
function notFound(res) {
  return res.status(404).json({ error: { message: "Event not found" } });
}

// Schema kuralına uymayan (ValidationError) ya da tipe çevrilemeyen (CastError,
// örn. yanlış biçimli tarih) veri istemci hatasıdır → 400.
function isClientError(err) {
  return err.name === "ValidationError" || err.name === "CastError";
}

// GET /events  (?category=Atölye ile süzülebilir)
export async function getEvents(req, res, next) {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

// GET /events/:id
export async function getEventById(req, res, next) {
  try {
    // Biçimi yanlış id ("yok") CastError'a gitmeden 404 döner.
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const event = await Event.findById(req.params.id);
    if (!event) return notFound(res);
    res.json(event);
  } catch (err) {
    next(err);
  }
}

// POST /events — doğrulamayı schema yapar, burada 400'e çevrilir.
export async function createEvent(req, res, next) {
  try {
    const event = await Event.create(req.body ?? {});
    res.status(201).json(event);
  } catch (err) {
    if (isClientError(err)) {
      return res.status(400).json({ error: { message: err.message } });
    }
    next(err);
  }
}

// PATCH /events/:id — sadece gönderilen alanlar değişir.
export async function updateEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);

    const body = req.body ?? {};
    // Dizi ya da "$set" gibi işleçler gövde olarak kabul edilmez: sadece alan: değer.
    if (Array.isArray(body) || Object.keys(body).some((k) => k.startsWith("$"))) {
      return res.status(400).json({ error: { message: "Invalid body" } });
    }
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ error: { message: "Body is empty" } });
    }

    const korunan = Object.keys(body).filter((k) => KORUNAN_ALANLAR.includes(k));
    if (korunan.length > 0) {
      return res
        .status(400)
        .json({ error: { message: `${korunan.join(", ")} cannot be changed` } });
    }

    const event = await Event.findByIdAndUpdate(req.params.id, body, {
      returnDocument: "after", // güncellenmiş kaydı döndür (yoksa eski hali gelir)
      runValidators: true, // schema kuralları (enum, minlength...) burada da çalışsın
    });
    if (!event) return notFound(res);
    res.json(event);
  } catch (err) {
    if (isClientError(err)) {
      return res.status(400).json({ error: { message: err.message } });
    }
    next(err);
  }
}
