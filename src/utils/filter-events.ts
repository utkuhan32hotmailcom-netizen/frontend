import type { CampusEvent, Category } from "../types/campus-event";

function normalize(text: string): string {
  return text.toLocaleLowerCase("tr").trim();
}

/** Başlık, açıklama ve yerde arar. Boş metin her şeyi döndürür. */
export function searchEvents(events: CampusEvent[], searchText: string): CampusEvent[] {
  const query = normalize(searchText);
  if (query === "") return events;
  return events.filter((event) =>
    normalize(`${event.title} ${event.description} ${event.location}`).includes(query),
  );
}

/** Boş kategori "Tümü" demektir. */
export function filterByCategory(events: CampusEvent[], category: Category | ""): CampusEvent[] {
  if (category === "") return events;
  return events.filter((event) => event.category === category);
}

export function findEventById(events: CampusEvent[], id: string): CampusEvent | undefined {
  return events.find((event) => event.id === id);
}

/** Tarihe (sonra saate) göre artan sıralı yeni dizi döndürür. */
export function sortByDate(events: CampusEvent[]): CampusEvent[] {
  return [...events].sort((a, b) =>
    `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`),
  );
}
