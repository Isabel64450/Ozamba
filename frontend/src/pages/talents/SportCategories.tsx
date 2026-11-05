import { useState } from "react";
import { Search } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DashboardRightSidebar from "../../components/DashboardRighSiderbar";
import { getSportsFor, isGender } from "../../config/sports";
import '../../styles/MensSports.css'

// Page « Choose the category » : /talents/men ou /talents/women
export default function SportCategories() {
  const navigate = useNavigate();
  const { gender } = useParams();
  const [search, setSearch] = useState("");

  // Section inconnue dans l'URL (ex. /talents/mixte) → retour au dashboard
  if (!isGender(gender)) {
    return <Navigate to="/dashboard" replace />;
  }

  const filteredSports = getSportsFor(gender).filter(([, sport]) =>
    sport.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mens-sports-page">
      <div className="mens-sports-layout">

        {/* Contenu principal */}
        <div className="mens-sports-content">

          <div className="mens-sports-header">
            <button className="back-button" onClick={() => navigate(-1)}>
              <span className="back-arrow">&lt;</span>
              <span className="talent">TALENTS</span>
            </button>
          </div>

          <div className="mens-sports-area">
            <div className="sports-search">
              <Search className="sports-search-icon" />
              <input
                type="text"
                placeholder="Who are you searching for?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <h1>CHOOSE THE CATEGORY</h1>

            <div className="sports-cards">
              {filteredSports.map(([slug, sport]) => {
                // Export Figma en priorité, sinon photo brute
                const background = sport.image ?? sport.photo;
                const variant = sport.image ? "sport-card--figma" : sport.photo ? "sport-card--photo" : "sport-card--no-image";

                return (
                  <button
                    key={slug}
                    className={`sport-card ${variant}`}
                    onClick={() => navigate(`/talents/${gender}/${slug}`)}
                    style={background ? { backgroundImage: `url("${background}")` } : undefined}
                    aria-label={sport.label}
                  >
                    {/* Le logo et le titre ne sont pas dans l'image : on les affiche */}
                    {!sport.image && sport.icon && (
                      <img className="sport-card-icon-img" src={sport.icon} alt="" />
                    )}
                    {!sport.image && (
                      <span className="sport-card-label">{sport.label.toUpperCase()}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <DashboardRightSidebar />
      </div>
    </div>
  );
}
