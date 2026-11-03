const AYLAR = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

/** "2026-10-12" -> "12 Ekim 2026". Saat dilimi sorunu olmasın diye Date kullanılmaz. */
export function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day || month > 12) return date;
  return `${day} ${AYLAR[month - 1]} ${year}`;
}

/** "2026-10-12", "14:00" -> "12 Ekim 2026, 14:00" */
export function formatDateTime(date: string, time: string): string {
  return time ? `${formatDate(date)}, ${time}` : formatDate(date);
}
