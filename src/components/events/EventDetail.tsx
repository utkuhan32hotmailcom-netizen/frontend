import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDateTime } from "../../utils/format-date";

export default function EventDetail({ event }: { event: CampusEvent }) {
  return (
    <article className="detay">
      <div>
        <figure className="afis">
          <div className="afis-kutu" role="img" aria-label={`${event.title} afişi`}>
            <strong>{event.title}</strong>
            <span>{event.category}</span>
          </div>
          <figcaption>{event.title} afişi</figcaption>
        </figure>
        <h2>Açıklama</h2>
        <p>{event.description}</p>
        <div className="buton-sira">
          <Link className="buton" to="/events">
            ← Listeye dön
          </Link>
          <Link className="buton" to={`/admin/${event.id}/edit`}>
            Bu etkinliği güncelle
          </Link>
        </div>
      </div>
      <aside className="kunye">
        <h2>Etkinlik Künyesi</h2>
        <dl>
          <dt>Tarih</dt>
          <dd>{formatDateTime(event.date, event.time)}</dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </aside>
    </article>
  );
}
