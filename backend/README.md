# Kampüs Etkinlikleri — Backend (Sprint 8)

Utku Erdoğan · 2311012074

Etkinlikleri JSON olarak veren Node + Express REST API. Veri MongoDB'de (Mongoose) tutulur; sunucu kapanıp açılınca kayıtlar kaybolmaz.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env     # sonra .env içindeki STUDENT_NO ve MONGODB_URI'yi doldur (Windows: copy .env.example .env)
npm run seed             # veritabanını 6 örnek etkinlikle doldurur (her çalıştırmada yine 6)
npm run dev              # http://localhost:3000
```

`.env` GitHub'a gönderilmez; gerçek bağlantı adresi (şifre) sadece orada durur. Port `.env` içindeki `PORT` değişkeninden okunur (yoksa 3000).

| Değişken | Anlamı |
| --- | --- |
| `PORT` | Sunucunun dinleyeceği port (varsayılan 3000) |
| `STUDENT_NO` | `/health` yanıtındaki öğrenci numarası |
| `MONGODB_URI` | MongoDB bağlantı adresi (Atlas: `mongodb+srv://...mongodb.net/kampus`) |

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` ile süzülür) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

Status code'lar: 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı.

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

### POST /events örnek gövde

```json
{
  "title": "Docker Atölyesi",
  "category": "Atölye",
  "date": "2026-12-15",
  "capacity": 30,
  "time": "14:00",
  "location": "Bilgisayar Laboratuvarı 1",
  "description": "Konteyner mantığı ve ilk imajını hazırlama."
}
```

Kurallar `src/models/event-model.js` içindeki schema'dadır: `title` (3–100 karakter), `category` (Seminer, Atölye, Söyleşi, Yarışma) ve `date` zorunludur. Kurala uymayan gövde `400` döner. Başarılı yanıtta MongoDB'nin verdiği `_id` ve `createdAt` bulunur.

Geçersiz biçimdeki (`/events/yok`) ya da bulunamayan id'ler `404` döner.

## Postman

`requests/kampus-api.json` dosyasını Postman'de **Import** ile içe aktar. 7 istek içerir:
health, liste, tek etkinlik, olmayan etkinlik (404), olmayan _id (404), oluştur (201), eksik veri (400).
Liste isteği ilk etkinliğin `_id`'sini `eventId` değişkenine yazar; tek etkinlik isteği onu kullanır.

## Klasör yapısı

```
backend/
  src/
    app.js  server.js  seed.js
    config/database.js
    models/event-model.js
    data/seed-events.js
    routes/event-routes.js
    controllers/event-controller.js
  requests/kampus-api.json
  .env.example  .gitignore  package.json  README.md
```
