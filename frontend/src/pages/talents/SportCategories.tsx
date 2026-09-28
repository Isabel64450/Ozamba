import { useState } from "react";
import { Search } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DashboardRightSidebar from "../../components/DashboardRighSiderbar";
import { getSportsFor, isGender } from "../../config/sports";
import "../../styles/MensSports.css";

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
              {filteredSports.map(([slug, sport]) => (
                <button
                  key={slug}
                  className={`sport-card ${sport.image ? "" : "sport-card--no-image"}`}
                  onClick={() => navigate(`/talents/${gender}/${slug}`)}
                  style={sport.image ? { backgroundImage: `url("${sport.image}")` } : undefined}
                  aria-label={sport.label}
                >
                  {/* Pas d'image fournie : on affiche le nom du sport */}
                  {!sport.image && (
                    <span className="sport-card-label">{sport.label.toUpperCase()}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <DashboardRightSidebar />
      </div>
    </div>
  );
}
