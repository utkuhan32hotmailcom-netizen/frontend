import { useState } from "react";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { filterByCategory, searchEvents, sortByDate } from "../utils/filter-events";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const filtered = filterByCategory(searchEvents(sortByDate(events), searchText), category);

  return (
    <>
      <EventFilter
        searchText={searchText}
        category={category}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />
      <p className="sayac" aria-live="polite">
        {filtered.length} etkinlik listeleniyor.
      </p>
      <EventList events={filtered} />
    </>
  );
}
