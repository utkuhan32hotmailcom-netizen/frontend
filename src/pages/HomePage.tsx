import { Link } from "react-router-dom";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";
import { sortByDate } from "../utils/filter-events";

export default function HomePage() {
  const { events } = useEvents();
  const upcoming = sortByDate(events).slice(0, 2);

  return (
    <>
      <h2 className="bolum-baslik">Yaklaşan {upcoming.length} Etkinlik</h2>
      <EventList events={upcoming} />
      <Link className="buton" to="/events">
        Tüm etkinlikleri gör
      </Link>
    </>
  );
}
