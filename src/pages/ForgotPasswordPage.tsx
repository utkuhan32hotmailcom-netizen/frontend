import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { validateForgot } from "../utils/validate-auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateForgot(email);
    setError(found);
    setSent(found === "");
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>

      <div className="alan">
        <label htmlFor="email">E-posta</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
        />
        {error && <span className="hata-metni">{error}</span>}
      </div>

      <button type="submit" className="buton">
        Bağlantı gönder
      </button>

      {sent && (
        <p className="mesaj mesaj-basari" role="status">
          Bağlantı {email} adresine gönderildi (demo).
        </p>
      )}

      <p className="alt-linkler">
        <Link to="/login">← Girişe dön</Link>
      </p>
    </form>
  );
}
