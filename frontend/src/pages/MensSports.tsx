import { useState } from "react";
import {  Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardRightSidebar from "../components/DashboardRighSiderbar";
import "../styles/MensSports.css";

export default function MensSports() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const sports = [
    {
      name: "Basketball",
      path: "/sports/mens/basketball",
      image: "/Group 33954.png",
    },
    {
      name: "Football",
      path: "/sports/mens/football",
      image: "/Group 33955.png ",
    },
    {
      name: "Volleyball",
      path: "/sports/mens/volleyball",
      image: "/Group 34101.png",
    },
  ];

  const filteredSports = sports.filter((sport) =>
    sport.name.toLowerCase().includes(search.toLowerCase())
  );

  
   return (
    <main className="mens-sports-page">

      <div className="mens-sports-layout">

        {/* Contenu principal */}
        <div className="mens-sports-content">
          
          <div className="mens-sports-header">
            <button
              className="back-button"
              onClick={() => navigate(-1)}
            >
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
            
            {filteredSports.map((sport) => (
              <button
                key={sport.name}
                className="sport-card"
                onClick={() => navigate(sport.path)}
                 style={{ backgroundImage: `url("${sport.image}")`,}}
              >
                <div className="sport-card-overlay">
                <div className="sport-card-icon">
                  
                </div>

               
                </div>
              </button>
            ))}
          </div>
          </div>
        </div>

        {/* Colonne droite */}
        <DashboardRightSidebar />

      </div>

    </main>
  );
}