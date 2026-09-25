import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardRightSidebar from "../components/DashboardRighSiderbar";
import "../styles/MensSports.css";
import "../styles/TalentsBasketball.css";

export default function TalentsBasketball() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const athletes = [
    {
      id: 1,
      name: "Victor Wembanyama",
      position: "CENTER",
      team: "SAN ANTONIO SPURS",
      number: "01",
      image: "/athletes/victor-wembanyama.png",
    },
    {
      id: 2,
      name: "Stephen Curry",
      position: "POINT GUARD",
      team: "GOLDEN STATE WARRIORS",
      number: "02",
      image: "/athletes/stephen-curry.png",
    },
    {
      id: 3,
      name: "LeBron James",
      position: "SMALL FORWARD",
      team: "LOS ANGELES LAKERS",
      number: "03",
      image: "/athletes/lebron-james.png",
    },
  ];

  const filteredAthletes = athletes.filter((athlete) =>
    `${athlete.name} ${athlete.position} ${athlete.team}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="mens-sports-page">
      <div className="mens-sports-layout">

        {/* Contenu principal */}
        <div className="mens-sports-content">

          {/* Header */}
          <div className="mens-sports-header">
            <button
              className="back-button"
              onClick={() => navigate(-1)}
            >
              <span className="back-arrow">&lt;</span>
              <span className="talent">TALENTS</span>
            </button>
             <span className="basketball-separator">→</span>

             <span className="basketball-title">BASKETBALL</span>
          </div>

          <div className="sports-area basketball-area">

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

            

            {/* Terrains */}
            <section className="basketball-courts">

              <div className="basketball-court-card">
                <img
                  src="/Group 34102.png"
                  alt="Basketball offensive positions"
                />

               
              </div>

              <div className="basketball-court-card">
                <img
                  src="/Group 34103.png"
                  alt="Basketball defensive positions"
                />

                
              </div>

            </section>

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
                    onClick={() =>
                      navigate(`/sports/mens/basketball/${athlete.id}`)
                    }
                  >

                    <span className="basketball-athlete-number">
                      {athlete.number}
                    </span>

                    <div className="basketball-athlete-image">
                      <img
                        src={athlete.image}
                        alt={athlete.name}
                      />
                    </div>

                    <div className="basketball-athlete-info">
                      <h3>{athlete.name}</h3>
                      <span>{athlete.position}</span>
                    </div>

                    <div className="basketball-athlete-team">
                      {athlete.team}
                    </div>

                    <span className="basketball-athlete-arrow">
                      →
                    </span>

                  </button>
                ))}

                {filteredAthletes.length === 0 && (
                  <div className="basketball-empty">
                    No athlete found.
                  </div>
                )}

              </div>

            </section>

          </div>
        </div>

        {/* Colonne droite */}
        <DashboardRightSidebar />

      </div>
    </main>
  );
}
