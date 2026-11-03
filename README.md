# Kampüs Etkinlikleri — Sprint 6 + Vize

Utku Erdoğan · 2311012074

   **Canlı adres (Vercel):** https://utkuerdogan-frontend.vercel.app <!-- deploy sonrası güncelle -->

## Kurulum

```bash
npm install
npm run dev     # geliştirme sunucusu
npm run build   # tsc + üretim derlemesi
```

## Route listesi

| Adres | Sayfa |
| --- | --- |
| `/` | HomePage |
| `/events` | EventsPage |
| `/events/:id` | EventDetailPage |
| `/login` | LoginPage |
| `/register` | RegisterPage |
| `/forgot-password` | ForgotPasswordPage |
| `/admin` | AdminPage |
| `/admin/new` | AddEventPage |
| `/admin/:id/edit` | EditEventPage |
| `*` | NotFoundPage |

## Özellikler

- React Router ile 10 adres, `Link`/`NavLink` ile gezinme
- `EventsContext`: liste + `addEvent`, `updateEvent`, `deleteEvent`
- Controlled form ve saf `validateEvent` fonksiyonu
- Yönetim sayfasında ekle, güncelle, onaylı sil
- Arama ve kategori filtresi
- Giriş, kayıt, şifremi unuttum formları (doğrulama; gerçek giriş Sprint 10'da)
- Mobil görünümde tablo kartlara dönüşür
