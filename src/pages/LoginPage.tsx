import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { validateLogin } from "../utils/validate-auth";
import type { LoginErrors } from "../utils/validate-auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateLogin(email, password);
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="alan">
        <label htmlFor="email">E-posta</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
        />
        {errors.email && <span className="hata-metni">{errors.email}</span>}
      </div>

      <div className="alan">
        <label htmlFor="password">Şifre</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={errors.password ? true : undefined}
        />
        {errors.password && <span className="hata-metni">{errors.password}</span>}
      </div>

      <button type="submit" className="buton buton-mor">
        Giriş yap
      </button>

      {sent && (
        <p className="mesaj mesaj-basari" role="status">
          Gerçek giriş Sprint 10'da. Bilgiler hiçbir yere gönderilmedi.
        </p>
      )}

      <p className="alt-linkler">
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </p>
    </form>
  );
}
