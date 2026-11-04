import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DashboardRightSidebar from "../../components/DashboardRighSiderbar";
import ArrowIcon from "../../components/ArrowIcon";
import { SPORTS, isGender, isSport } from "../../config/sports";
import { getTalents } from "../../api/talents";
import type { TalentListItem } from "../../types/talent";
import "../../styles/MensSports.css";
import "../../styles/TalentsBasketball.css";

// Liste des athlètes d'un sport : /talents/:gender/:sport (une seule page pour tous les sports)
export default function AthletesPage() {
  const navigate = useNavigate();
  const { gender, sport } = useParams();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<{
    key: string;
    athletes: TalentListItem[];
    error: string | null;
  } | null>(null);

  const isValidUrl =
    isGender(gender) && isSport(sport) && SPORTS[sport].genders.includes(gender);

  // Identifie la liste demandée : sert à savoir si le résultat en mémoire est le bon
  const requestKey = `${gender}/${sport}`;

  // Charge les athlètes à chaque changement de section ou de sport
  useEffect(() => {
    if (!isValidUrl || !gender || !sport) return;

    let cancelled = false; // évite d'afficher une réponse arrivée après un changement de page

    getTalents(gender, sport)
      .then((athletes) => {
        if (!cancelled) setResult({ key: requestKey, athletes, error: null });
      })
      .catch(() => {
        if (!cancelled) setResult({ key: requestKey, athletes: [], error: "Unable to load athletes." });
      });

    return () => {
      cancelled = true;
    };
  }, [gender, sport, isValidUrl, requestKey]);

  // Tant que le résultat ne correspond pas à la page affichée, on est en chargement
  const current = result?.key === requestKey ? result : null;
  const loading = current === null;
  const athletes = current?.athletes ?? [];
  const error = current?.error ?? null;

  // URL invalide, ou sport absent de cette section (ex. /talents/men/hockey)
  if (!isValidUrl) {
    return <Navigate to={isGender(gender) ? `/talents/${gender}` : "/dashboard"} replace />;
  }

  const config = SPORTS[sport];

  // La recherche reste côté front : la liste d'un sport est courte
  const filteredAthletes = athletes.filter((athlete) =>
    `${athlete.firstName} ${athlete.lastName} ${athlete.position ?? ""} ${athlete.club ?? ""}`
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
                {!loading && !error && <span>{filteredAthletes.length} ATHLETES</span>}
              </div>

              <div className="basketball-athletes-list">
                {loading && <div className="basketball-empty">Loading…</div>}

                {error && <div className="basketball-empty">{error}</div>}

                {!loading && !error && filteredAthletes.map((athlete) => (
                  <button
                    key={athlete.id}
                    className="basketball-athlete"
                    onClick={() => navigate(`/talents/${gender}/${sport}/${athlete.id}`)}
                  >
                    <span className="basketball-athlete-number">{athlete.number ?? "–"}</span>

                    <div className="basketball-athlete-image">
                      {athlete.photo ? (
                        <img src={athlete.photo} alt={`${athlete.firstName} ${athlete.lastName}`} />
                      ) : (
                        <span className="basketball-athlete-initials">
                          {athlete.firstName.charAt(0)}{athlete.lastName.charAt(0)}
                        </span>
                      )}
                    </div>

                    <div className="basketball-athlete-info">
                      <h3>{athlete.firstName} {athlete.lastName}</h3>
                      <span>{athlete.position?.toUpperCase()}</span>
                    </div>

                    <div className="basketball-athlete-team">{athlete.club?.toUpperCase()}</div>

                    <ArrowIcon className="basketball-athlete-arrow" />
                  </button>
                ))}

                {!loading && !error && filteredAthletes.length === 0 && (
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
