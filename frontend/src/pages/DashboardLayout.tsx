import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import "../styles/DasboardLayout.css";

// Layout commun : sidebar à gauche + page enfant de la route dans <Outlet />
export default function DashboardLayout() {
  // Tiroir du menu sur mobile (la sidebar est toujours visible sur grand écran)
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Barre du haut : affichée seulement sur tablette / mobile (voir CSS) */}
      <header className="mobile-topbar">
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
        >
          <Menu />
        </button>
        <img src="/nouveau logo oz blanc.png" alt="Ozamba Group" className="mobile-topbar-logo" />
      </header>

      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
