import { Router } from "express";
import {
  createEvent,
  getEventById,
  getEvents,
  updateEvent,
} from "../controllers/event-controller.js";

const router = Router();

// app.js'te app.use("/events", ...) dediğimiz için burada "/" aslında /events demek.
router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.patch("/:id", updateEvent);

export default router;
