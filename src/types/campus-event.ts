export const CATEGORIES = ["Seminer", "Atölye", "Söyleşi", "Yarışma"] as const;

export type Category = (typeof CATEGORIES)[number];

/** Uygulamada saklanan etkinlik. */
export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string; // "2026-10-12"
  time: string; // "14:00"
  location: string;
  capacity: number;
  description: string;
}

/** Formun tuttuğu değerler: id yok, kontenjan ve kategori form için metin. */
export interface EventFormData {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}

/** Her alan için en fazla bir hata mesajı. */
export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
