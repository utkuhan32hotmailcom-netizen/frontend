import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDateTime } from "../../utils/format-date";

export default function EventCard({ event }: { event: CampusEvent }) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <span className="etiket">{event.category}</span>
      <p>Tarih: {formatDateTime(event.date, event.time)}</p>
      <p>Yer: {event.location}</p>
      <p>Kontenjan: {event.capacity} kişi</p>
      <p>{event.description}</p>
      <Link to={`/events/${event.id}`}>Detayları gör</Link>
    </article>
  );
}
