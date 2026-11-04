import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DashboardRightSidebar from "../../components/DashboardRighSiderbar";
import ArrowIcon from "../../components/ArrowIcon";
import { SPORTS, isGender, isSport } from "../../config/sports";
import { getTalentById } from "../../api/talents";
import type { TalentDetail } from "../../types/talent";
import "../../styles/MensSports.css";
import "../../styles/AthleteProfile.css";

// Date ISO → « 12 March 1998 » (même format que le formulaire New Athlete)
function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// 185 (cm) → « 1m85 », comme dans le formulaire New Athlete
function formatHeight(cm: number | null | undefined): string | null {
  if (!cm) return null;
  return `${Math.floor(cm / 100)}m${String(cm % 100).padStart(2, "0")}`;
}

// under_development → « UNDER DEVELOPMENT »
function formatStatus(status: string | null): string | null {
  return status ? status.replace(/_/g, " ").toUpperCase() : null;
}

// Fiche d'un athlète : /talents/:gender/:sport/:id
export default function AthleteProfile() {
  const navigate = useNavigate();
  const { gender, sport, id } = useParams();
  const [result, setResult] = useState<{
    id: string;
    athlete: TalentDetail | null;
    error: string | null;
  } | null>(null);

  const isValidUrl =
    isGender(gender) && isSport(sport) && SPORTS[sport].genders.includes(gender);

  useEffect(() => {
    if (!isValidUrl || !id) return;

    let cancelled = false; // évite d'afficher une réponse arrivée après un changement de page

    getTalentById(id)
      .then((athlete) => {
        if (!cancelled) setResult({ id, athlete, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const notFound = axios.isAxiosError(err) && err.response?.status === 404;
        setResult({
          id,
          athlete: null,
          error: notFound ? "Athlete not found." : "Unable to load this athlete.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [id, isValidUrl]);

  // Tant que le résultat ne correspond pas à l'id de l'URL, on est en chargement
  const current = result?.id === id ? result : null;
  const loading = current === null;
  const athlete = current?.athlete ?? null;
  const error = current?.error ?? null;

  if (!isValidUrl) {
    return <Navigate to={isGender(gender) ? `/talents/${gender}` : "/dashboard"} replace />;
  }

  const config = SPORTS[sport];
  const backToList = () => navigate(`/talents/${gender}/${sport}`);

  // Seules les infos renseignées sont affichées
  const details = athlete
    ? [
        { label: "CLUB", value: athlete.club },
        { label: "POSITION", value: athlete.position },
        { label: "HEIGHT", value: formatHeight(athlete.height) },
        { label: "WEIGHT", value: athlete.weight ? `${athlete.weight} kg` : null },
        { label: "BIRTH DATE", value: formatDate(athlete.birthDate) },
        { label: "CONTRACT ENDS", value: formatDate(athlete.contractEnded) },
        { label: "STATUS", value: formatStatus(athlete.status) },
      ].filter((detail) => detail.value)
    : [];

  return (
    <div className="mens-sports-page">
      <div className="mens-sports-layout">

        <div className="mens-sports-content">

          {/* Fil d'Ariane : < TALENTS → BASKETBALL */}
          <div className="mens-sports-header">
            <button className="back-button" onClick={backToList}>
              <span className="back-arrow">&lt;</span>
              <span className="talent">TALENTS</span>
            </button>
            <ArrowIcon className="basketball-separator" />
            <button className="athlete-profile-sport" onClick={backToList}>
              {config.label.toUpperCase()}
            </button>
          </div>

          <div className="mens-sports-area athlete-profile-area">

            {loading && <p className="athlete-profile-message">Loading…</p>}

            {error && (
              <div className="athlete-profile-message">
                <p>{error}</p>
                <button className="athlete-profile-link" onClick={backToList}>
                  Back to {config.label} athletes
                </button>
              </div>
            )}

            {!loading && !error && athlete && (
              <article className="athlete-profile-card">

                {/* Photo */}
                <div className="athlete-profile-photo">
                  {athlete.photo ? (
                    <img src={athlete.photo} alt={`${athlete.firstName} ${athlete.lastName}`} />
                  ) : (
                    <span className="athlete-profile-initials">
                      {athlete.firstName.charAt(0)}{athlete.lastName.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Identité + infos */}
                <div className="athlete-profile-info">
                  {athlete.number && (
                    <span className="athlete-profile-number">#{athlete.number}</span>
                  )}

                  <h1 className="athlete-profile-name">
                    <span>{athlete.firstName}</span>
                    {athlete.lastName.toUpperCase()}
                  </h1>

                  <dl className="athlete-profile-details">
                    {details.map((detail) => (
                      <div key={detail.label} className="athlete-profile-detail">
                        <dt>{detail.label}</dt>
                        <dd>{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            )}
          </div>
        </div>

        <DashboardRightSidebar />
      </div>
    </div>
  );
}
