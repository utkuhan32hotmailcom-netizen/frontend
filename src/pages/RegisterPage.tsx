import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { validateRegister } from "../utils/validate-auth";
import type { RegisterErrors } from "../utils/validate-auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateRegister({ name, email, password, password2 });
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="alan">
        <label htmlFor="name">Ad Soyad</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
        />
        {errors.name && <span className="hata-metni">{errors.name}</span>}
      </div>

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

      <div className="alan">
        <label htmlFor="password2">Şifre (tekrar)</label>
        <input
          id="password2"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          aria-invalid={errors.password2 ? true : undefined}
        />
        {errors.password2 && <span className="hata-metni">{errors.password2}</span>}
      </div>

      <button type="submit" className="buton buton-mor">
        Kayıt ol
      </button>

      {sent && (
        <p className="mesaj mesaj-basari" role="status">
          Kayıt formu geçerli. Gerçek kayıt Sprint 10'da.
        </p>
      )}

      <p className="alt-linkler">
        <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
      </p>
    </form>
  );
}
