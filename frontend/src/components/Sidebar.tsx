import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../styles/Sidebar.css";
import LanguageSelector from "./LanguageSelector";

export default function Sidebar() {
     const [openMenu, setOpenMenu] = useState<string | null>(null);

     const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };
  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <img
          src="/nouveau logo oz blanc.png"
          alt="Ozamba Group"
        />
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">

        <NavLink to="/dashboard" className="sidebar-link">
          <span className="sidebar-icon"></span>
          <span>Dashboard</span>
        </NavLink>

        
 <div className="sidebar-section">
          <button
            className="sidebar-link sidebar-dropdown"
            onClick={() => toggleMenu("hg")}
          >
            <span className="sidebar-icon"></span>
            <span>HG</span>

            <span className={`arrow ${openMenu === "hg" ? "open" : ""}`}>
              ›
            </span>
          </button>

          {openMenu === "hg" && (
            <div className="sidebar-submenu">
              <NavLink to="/hg/legal" className="sidebar-sublink">
                Legal
              </NavLink>

              <NavLink to="/hg/hr" className="sidebar-sublink">
                HR
              </NavLink>

              <NavLink to="/hg/finance" className="sidebar-sublink">
                Finance
              </NavLink>

              <NavLink to="/hg/innovation" className="sidebar-sublink">
                Innovation & Digital
              </NavLink>
            </div>
          )}
        </div>


        {/* Talents */}
        <div className="sidebar-section">
          <button
            className="sidebar-link sidebar-dropdown"
            onClick={() => toggleMenu("talents")}
          >
            <span className="sidebar-icon"></span>
            <span>Talents</span>

            <span className={`arrow ${openMenu === "talents" ? "open" : ""}`}>
              ›
            </span>
          </button>

          {openMenu === "talents" && (
            <div className="sidebar-submenu">

              <NavLink
                to="/talents/mens-sports"
                className="sidebar-sublink"
              >
                Men's Sports
              </NavLink>

              <NavLink
                to="/talents/womens-sports"
                className="sidebar-sublink"
              >
                Women's Sports
              </NavLink>

              <NavLink
                to="/talents/creators"
                className="sidebar-sublink"
              >
                Creators
              </NavLink>

               <NavLink
                to="/talents/marketing"
                className="sidebar-sublink"
              >
                Marketing & Nil
              </NavLink>

            </div>
          )}
        </div>


        {/* Brands */}
        <div className="sidebar-section">
          <button
            className="sidebar-link sidebar-dropdown"
            onClick={() => toggleMenu("brands")}
          >
            <span className="sidebar-icon"></span>
            <span>Brands</span>

            <span className={`arrow ${openMenu === "brands" ? "open" : ""}`}>
              ›
            </span>
          </button>

          {openMenu === "brands" && (
            <div className="sidebar-submenu">
               <NavLink
                to="/brands/strategy"
                className="sidebar-sublink"
              >
                Strategy
              </NavLink>

              <NavLink
                to="/brands/creative-content"
                className="sidebar-sublink"
              >
                Creative & Content
              </NavLink>
             
              <NavLink
                to="/brands/Partners"
                className="sidebar-sublink"
              >
                Partners & Ups
              </NavLink>
              
              <NavLink
                to="/brands/growth"
                className="sidebar-sublink"
              >
                Growth & ....
              </NavLink>

            </div>
          )}
        </div>


        {/* Enterprises */}
        <div className="sidebar-section">
          <button
            className="sidebar-link sidebar-dropdown"
            onClick={() => toggleMenu("enterprises")}
          >
            <span className="sidebar-icon"></span>
            <span>Enterprises</span>

            <span
              className={`arrow ${
                openMenu === "enterprises" ? "open" : ""
              }`}
            >
              ›
            </span>
          </button>

          {openMenu === "enterprises" && (
            <div className="sidebar-submenu">

              <NavLink
                to="/enterprises/executive-solutions"
                className="sidebar-sublink"
              >
                Executive Solutions
              </NavLink>

              <NavLink
                to="/enterprises/public-affairs"
                className="sidebar-sublink"
              >
                Public Affairs
              </NavLink>

              <NavLink
                to="/enterprises/venture"
                className="sidebar-sublink"
              >
                Venture Studios
              </NavLink>

            </div>
          )}
        </div>


        {/* Events */}
        <div className="sidebar-section">
          <button
            className="sidebar-link sidebar-dropdown"
            onClick={() => toggleMenu("events")}
          >
            <span className="sidebar-icon"></span>
            <span>Events</span>

            <span className={`arrow ${openMenu === "events" ? "open" : ""}`}>
              ›
            </span>
          </button>

          {openMenu === "events" && (
            <div className="sidebar-submenu">

              <NavLink
                to="/events/sports"
                className="sidebar-sublink"
              >
                Sports
              </NavLink>

              <NavLink
                to="/events/entertainment"
                className="sidebar-sublink"
              >
                Entertainment
              </NavLink>

              <NavLink
                to="/events/news-culture"
                className="sidebar-sublink"
              >
                Music & Culture
              </NavLink>

            </div>
          )}
        </div>


        {/* Productions */}
        <div className="sidebar-section">
          <button
            className="sidebar-link sidebar-dropdown"
            onClick={() => toggleMenu("productions")}
          >
            <span className="sidebar-icon"></span>
            <span>Productions</span>

            <span
              className={`arrow ${
                openMenu === "productions" ? "open" : ""
              }`}
            >
              ›
            </span>
          </button>

          {openMenu === "productions" && (
            <div className="sidebar-submenu">

              <NavLink
                to="/productions/projects"
                className="sidebar-sublink"
              >
                Projects
              </NavLink>

              <NavLink
                to="/productions/pre-production"
                className="sidebar-sublink"
              >
                Other Services
              </NavLink>

              <NavLink
                to="/productions/production"
                className="sidebar-sublink"
              >
                Pre & Post Production
              </NavLink>

              

            </div>
          )}
        </div>

      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <LanguageSelector />
      </div>
    </aside>
  );
}