import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

export default function EventList({ events }: { events: CampusEvent[] }) {
  if (events.length === 0) {
    return <p className="bos-mesaj">Aramana uyan etkinlik bulunamadı.</p>;
  }
  return (
    <div className="kart-izgara">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
