# Kampüs Etkinlikleri — Backend (Sprint 9)

Utku Erdoğan · 2311012074

Etkinlikleri JSON olarak veren Node + Express REST API. Veri MongoDB'de (Mongoose) tutulur; sunucu kapanıp açılınca kayıtlar kaybolmaz. Etkinlikler oluşturulur, okunur, güncellenir, silinir ve aranır (tam CRUD).

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env     # sonra .env içindeki STUDENT_NO ve MONGODB_URI'yi doldur (Windows: copy .env.example .env)
npm run seed             # veritabanını 6 örnek etkinlikle doldurur (her çalıştırmada yine 6; 3'ü geçmiş tarihli)
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
| GET | `/health` | Sunucu ayakta mı | 200 | — | çalışıyor |
| GET | `/events` | Listeyi getir, tarihe göre sıralı | 200 | — | çalışıyor |
| GET | `/events?search=&category=` | Başlıkta ara (büyük/küçük harf fark etmez) ve/veya kategoriye göre süz | 200 | — | çalışıyor |
| GET | `/events/upcoming` | Bugün ve sonrası, en yakın önce | 200 | — | çalışıyor |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | çalışıyor |
| POST | `/events` | Yeni etkinlik | 201 | 400 | çalışıyor |
| PATCH | `/events/:id` | Sadece gönderilen alanları güncelle, güncel kaydı döndür | 200 | 400, 404 | çalışıyor |
| DELETE | `/events/:id` | Sil | 204 (gövde yok) | 404 | çalışıyor |

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
  "date": "15-12-2026",
  "capacity": 30,
  "time": "14:00",
  "location": "Bilgisayar Laboratuvarı 1",
  "description": "Konteyner mantığı ve ilk imajını hazırlama."
}
```

Kurallar `src/models/event-model.js` içindeki schema'dadır: `title` (3–100 karakter), `category` (Seminer, Atölye, Söyleşi, Yarışma) ve `date` zorunludur. Kurala uymayan gövde `400` döner. Başarılı yanıtta MongoDB'nin verdiği `_id` ve `createdAt` bulunur.

### Tarih: GG-AA-YYYY

Tarih API'ye her yerde `"15-12-2026"` biçiminde gelir ve öyle döner. Veritabanında gerçek `Date` olarak durur (`src/utils/date.js`): metin olsaydı `"05-11-2026"` `"15-10-2026"`'dan küçük sayılır, Kasım Ekim'den önce sıralanırdı. `"2026-12-20"` gibi başka biçim ya da `"31-02-2026"` gibi olmayan gün `400` döner.

### PATCH /events/:id

Sadece gövdede gönderilen alanlar değişir; schema kuralları güncellemede de çalışır.

| Gövde | Sonuç |
| --- | --- |
| `{ "capacity": 55 }` | 200, sadece capacity değişti |
| `{}` | 400 `Body is empty` |
| `{ "category": "Parti" }` | 400 (kategori listede yok) |
| `{ "_id": "abc" }` | 400 `_id cannot be changed` (`createdAt`, `updatedAt`, `__v` de) |
| olmayan ya da silinmiş id | 404 `Event not found` |

Geçersiz biçimdeki (`/events/yok`) ya da bulunamayan id'ler her endpoint'te `404` döner.

## Postman

`requests/kampus-api.json` dosyasını Postman'de **Import** ile içe aktar. 19 istek içerir:
health, liste, tek etkinlik, 404'ler, oluştur (201), eksik veri (400), yanlış tarih (400),
PATCH (200, trim, boş body, geçersiz kategori, `_id`, olmayan id), arama, arama + kategori,
yaklaşan etkinlikler, sil (204) ve tekrar sil (404).
Liste isteği ilk etkinliğin `_id`'sini `eventId`'ye, oluştur isteği yeni kaydın `_id`'sini `newId`'ye yazar;
PATCH ve DELETE `newId` ile çalışır, seed verisi bozulmaz.

Ders collection'ı: `newman run https://webdersi.vercel.app/test.json` (backend açıkken).
Runner sonucu `requests/run-results.json` olarak dışa aktarılır.

## Klasör yapısı

```
backend/
  src/
    app.js  server.js  seed.js
    config/database.js
    utils/date.js
    models/event-model.js
    data/seed-events.js
    routes/event-routes.js
    controllers/event-controller.js
  requests/kampus-api.json  run-results.json
  .env.example  .gitignore  package.json  README.md
```
