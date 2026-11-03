import { NavLink } from "react-router-dom";

const menu = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/events", label: "Etkinlikler" },
  { to: "/admin", label: "Yönetim" },
  { to: "/login", label: "Giriş" },
];

export default function Navigation() {
  return (
    <nav className="menu" aria-label="Ana menü">
      {menu.map((item) => (
        // end: Onsuz "/" her adresle eşleşir ve Ana Sayfa hep aktif görünür.
        <NavLink key={item.to} to={item.to} end={item.to === "/"}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
