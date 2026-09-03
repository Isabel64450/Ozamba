import { useNavigate } from "react-router-dom";
import WorldClock from "../../components/WorldClock";
import LanguageSelector from "../../components/LanguageSelector";
import "../../styles/dashboard/Sports.css";

export default function Sports() {
  const navigate = useNavigate();

  return (
    <main className="sports-page">

     
      <img
        src="/OzambaLogo.png"
        alt="Ozamba Group"
        className="sports-logo"
      />

     
      <section className="sports-content">
         <img src="/frameFond.png" alt="" className="login-background" /> 
        <h1 className="sports-title-main">
          <span className="title-white">WELCOME TO</span>
          <br />
          <span className="title-red">OZAMBA SPORTS</span>
        </h1>
       
        <div className="sports-visual">
          
        </div>

        <button
          className="sports-login"
          onClick={() => navigate("/login")}
        >
          LOGIN
        </button>

      </section>

     
      <WorldClock />
      <LanguageSelector />

    </main>
  );
}