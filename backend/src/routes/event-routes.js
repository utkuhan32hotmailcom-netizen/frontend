import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  getUpcomingEvents,
  updateEvent,
} from "../controllers/event-controller.js";

const router = Router();

// app.js'te app.use("/events", ...) dediğimiz için burada "/" aslında /events demek.
router.get("/", getEvents);
// Sabit adres /:id'den ÖNCE: Express yukarıdan aşağı dener, yoksa "upcoming" id sanılır → 404.
router.get("/upcoming", getUpcomingEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
