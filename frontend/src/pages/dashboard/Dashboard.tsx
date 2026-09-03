import { useState} from "react"
import { Link } from "react-router-dom";
import "../../styles/dashboard/Dashboard.css";

type Section = "sports" | "house" | "productions" | "creativity" | null;

interface SectionConfig {
  image: string;
  color: string;
}

const sections: Record<Exclude<Section, null>, SectionConfig> = {
  sports: {
    image: "/redDashboard.png",
    color: "#D42431",
  },

  house: {
    image: "/greenDashboard.png",
    color: "#20BF55",
  },

  productions: {
    image: "/orangeDashboard.png",
    color: "#FF6218",
  },

  creativity: {
    image: "/yellowDashboard.png",
    color: "#FFC000",
  },
};


export default function Dashboard() {
    const [activeSection, setActiveSection] = useState<Section>(null);

  const currentSection =
    activeSection !== null
      ? sections[activeSection]
      : null;

  return (
    <main className="dashboard">

      {/* Logo */}
      <img
        src="/iconGroupOzamba.png"
        alt="Ozamba Group"
        className="dashboard-logo"
      />

      {/* Liens des sections */}
       <Link
        to="/sports"
        className="dashboard-link dashboard-sports"
        style={{
          color:
            activeSection === "sports"
              ? sections.sports.color
              : "#EDEDED",
        }}
        onMouseEnter={() => setActiveSection("sports")}
        onMouseLeave={() => setActiveSection(null)}
      >
        SPORTS
      </Link>
      
       <Link
        to="/creativity"
        className="dashboard-link dashboard-creativity"
        style={{
          color:
            activeSection === "creativity"
              ? sections.creativity.color
              : "#EDEDED",
        }}
        onMouseEnter={() => setActiveSection("creativity")}
        onMouseLeave={() => setActiveSection(null)}
      >
        CREATIVE
      </Link>

       <Link
        to="/house"
        className="dashboard-link dashboard-house"
        style={{
          color:
            activeSection === "house"
              ? sections.house.color
              : "#EDEDED",
        }}
        onMouseEnter={() => setActiveSection("house")}
        onMouseLeave={() => setActiveSection(null)}
      >
        HOUSE
      </Link>

      <Link
        to="/productions"
        className="dashboard-link dashboard-productions"
        style={{
          color:
            activeSection === "productions"
              ? sections.productions.color
              : "#EDEDED",
        }}
        onMouseEnter={() => setActiveSection("productions")}
        onMouseLeave={() => setActiveSection(null)}
      >
        PRODUCTIONS
      </Link>
      

      {/* Centre */}
      <section className="dashboard-center">

        <div className="dashboard-visual">

          {/* Brume */}
          <div
            className="dashboard-glow"
            style={{
              background:
                currentSection?.color ?? "#EDEDED",
            }}
          />

          <img
            src={
              currentSection?.image ??
              "/fromGroup.png"
            }
            alt="Ozamba"
            className="dashboard-image"
          />

          

          <p
               className={`dashboard-title ${
                    activeSection !== null ? "dashboard-title-hover" : ""
                              }`}
>
  CHOOSE YOUR SIDE
</p>

        </div>

      </section>

    </main>
  );
}