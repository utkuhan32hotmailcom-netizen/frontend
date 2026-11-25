import mongoose from "mongoose";
import { formatDate, parseDate } from "../utils/date.js";

// Kurallar schema'da: eksik ya da yanlış veri kayda girmez (ValidationError).
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
    category: {
      type: String,
      required: true,
      enum: ["Seminer", "Atölye", "Söyleşi", "Yarışma"],
    },
    capacity: { type: Number, min: 0, default: 0 },
    // API'de "GG-AA-YYYY", veritabanında gerçek Date.
    // Metin olsaydı "05-11-2026" < "15-10-2026" olurdu: Kasım Ekim'den önce sıralanırdı.
    date: { type: Date, required: true, set: parseDate, get: formatDate },
    time: { type: String, default: "" },
    location: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, maxlength: 500, default: "" },
  },
  {
    timestamps: true, // createdAt ve updatedAt kendiliğinden
    // Yanıtta date getter'dan geçer ("15-10-2026"); getter'lar açılınca gelen "id" kopyası kapalı.
    toJSON: { getters: true },
    id: false,
  }
);

// Model adı "Event" → MongoDB'de collection adı "events".
export const Event = mongoose.model("Event", eventSchema);
