import { useParams } from "react-router-dom";
import EventDetail from "../components/events/EventDetail";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import NotFoundPage from "./NotFoundPage";

export default function EventDetailPage() {
  const { id } = useParams(); // 1. adresten id'yi oku
  const { events } = useEvents(); // 2. veriyi context'ten al
  const event = findEventById(events, id ?? ""); // 3. id'ye göre bul

  if (!event) return <NotFoundPage />; // 4. bulunamazsa
  return <EventDetail event={event} />;
}
