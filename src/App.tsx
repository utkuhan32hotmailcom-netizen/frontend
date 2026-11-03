import { Route, Routes, matchPath, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import { useEvents } from "./context/EventsContext";
import AddEventPage from "./pages/AddEventPage";
import AdminPage from "./pages/AdminPage";
import EditEventPage from "./pages/EditEventPage";
import EventDetailPage from "./pages/EventDetailPage";
import EventsPage from "./pages/EventsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import { findEventById } from "./utils/filter-events";

const SITE_TITLE = "Kampüs Etkinlikleri";
const SITE_SUBTITLE = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";

/** Adrese bakıp üst alandaki başlığı seçer; böylece sayfalar başlıkla uğraşmaz. */
function useHeaderText(): { title: string; subtitle?: string } {
  const { pathname } = useLocation();
  const { events } = useEvents();

  if (pathname === "/") return { title: SITE_TITLE, subtitle: SITE_SUBTITLE };
  if (pathname === "/events") {
    return { title: "Tüm Etkinlikler", subtitle: "Kampüste düzenlenen tüm etkinlikler." };
  }
  if (pathname === "/admin") return { title: SITE_TITLE, subtitle: SITE_SUBTITLE };
  if (pathname === "/admin/new") return { title: "Etkinlik Ekle" };
  if (pathname === "/login") return { title: "Giriş Yap" };
  if (pathname === "/register") return { title: "Kayıt Ol" };
  if (pathname === "/forgot-password") return { title: "Şifremi Unuttum" };

  const detail = matchPath("/events/:id", pathname) ?? matchPath("/admin/:id/edit", pathname);
  const event = detail ? findEventById(events, detail.params.id ?? "") : undefined;
  if (event) return { title: event.title, subtitle: `${event.category} · ${event.location}` };

  return { title: SITE_TITLE, subtitle: SITE_SUBTITLE };
}

function App() {
  const header = useHeaderText();

  return (
    <>
      <Header title={header.title} subtitle={header.subtitle} />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/new" element={<AddEventPage />} />
          <Route path="/admin/:id/edit" element={<EditEventPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
