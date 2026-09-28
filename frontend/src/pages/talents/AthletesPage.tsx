import { useState } from "react";
import { Search } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DashboardRightSidebar from "../../components/DashboardRighSiderbar";
import ArrowIcon from "../../components/ArrowIcon";
import { SPORTS, isGender, isSport } from "../../config/sports";
import { MOCK_ATHLETES } from "../../data/mockAthletes";
import "../../styles/MensSports.css";
import "../../styles/TalentsBasketball.css";

// Liste des athlètes d'un sport : /talents/:gender/:sport (une seule page pour tous les sports)
export default function AthletesPage() {
  const navigate = useNavigate();
  const { gender, sport } = useParams();
  const [search, setSearch] = useState("");

  // URL invalide, ou sport absent de cette section (ex. /talents/men/hockey)
  if (!isGender(gender) || !isSport(sport) || !SPORTS[sport].genders.includes(gender)) {
    return <Navigate to={isGender(gender) ? `/talents/${gender}` : "/dashboard"} replace />;
  }

  const config = SPORTS[sport];

  // Provisoire : filtre côté front sur les fausses données, remplacé plus tard par GET /athletes
  const filteredAthletes = MOCK_ATHLETES
    .filter((athlete) => athlete.gender === gender && athlete.sport === sport)
    .filter((athlete) =>
      `${athlete.name} ${athlete.position} ${athlete.team}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="mens-sports-page">
      <div className="mens-sports-layout">

        {/* Contenu principal */}
        <div className="mens-sports-content">

          {/* Header */}
          <div className="mens-sports-header">
            <button className="back-button" onClick={() => navigate(`/talents/${gender}`)}>
              <span className="back-arrow">&lt;</span>
              <span className="talent">TALENTS</span>
            </button>
            <ArrowIcon className="basketball-separator" />
            <span className="basketball-title">{config.label.toUpperCase()}</span>
          </div>

          <div className="mens-sports-area sports-area basketball-area">

            {/* Recherche */}
            <div className="sports-search">
              <Search className="sports-search-icon" />
              <input
                type="text"
                placeholder="Who are you searching for?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Terrains (seulement si les images existent pour ce sport) */}
            {config.courts.length > 0 && (
              <section className="basketball-courts">
                {config.courts.map((court) => (
                  <div key={court} className="basketball-court-card">
                    <img src={court} alt={`${config.label} positions`} />
                  </div>
                ))}
              </section>
            )}

            {/* Liste des athlètes */}
            <section className="basketball-athletes">
              <div className="basketball-athletes-header">
                <h2>ATHLETES</h2>
                <span>{filteredAthletes.length} ATHLETES</span>
              </div>

              <div className="basketball-athletes-list">
                {filteredAthletes.map((athlete) => (
                  <button
                    key={athlete.id}
                    className="basketball-athlete"
                    onClick={() => navigate(`/talents/${gender}/${sport}/${athlete.id}`)}
                  >
                    <span className="basketball-athlete-number">{athlete.number}</span>

                    <div className="basketball-athlete-image">
                      <img src={athlete.image} alt={athlete.name} />
                    </div>

                    <div className="basketball-athlete-info">
                      <h3>{athlete.name}</h3>
                      <span>{athlete.position}</span>
                    </div>

                    <div className="basketball-athlete-team">{athlete.team}</div>

                    <ArrowIcon className="basketball-athlete-arrow" />
                  </button>
                ))}

                {filteredAthletes.length === 0 && (
                  <div className="basketball-empty">No athlete found.</div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Colonne droite */}
        <DashboardRightSidebar />
      </div>
    </div>
  );
}
