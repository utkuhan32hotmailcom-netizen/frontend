import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { initialEvents } from "../data/events";
import type { CampusEvent, Category, EventFormData } from "../types/campus-event";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

/** Form verisini (metin) uygulamanın etkinlik tipine çevirir. Veri önceden doğrulanmıştır. */
function toEvent(id: string, data: EventFormData): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    capacity: Number(data.capacity),
    description: data.description.trim(),
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  // Diziyi değiştirmeyiz (push/splice yok); her seferinde yeni dizi kurarız.
  function addEvent(data: EventFormData) {
    setEvents((current) => [...current, toEvent(`event-${Date.now()}`, data)]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents((current) => current.map((e) => (e.id === id ? toEvent(id, data) : e)));
  }

  function deleteEvent(id: string) {
    setEvents((current) => current.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

// Kendi hook'umuz: useContext'in kısaltması + Provider unutulursa net hata.
// eslint-disable-next-line react-refresh/only-export-components
export function useEvents(): EventsContextValue {
  const value = useContext(EventsContext);
  if (value === null) throw new Error("useEvents, EventsProvider içinde kullanılmalı.");
  return value;
}
