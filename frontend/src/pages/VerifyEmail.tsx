import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import WorldClock from "../components/WorldClock";
import LanguageSelector from "../components/LanguageSelector";
import "../styles/VerifyEmail.css"

export default function VerifyEmail() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Vérification de votre compte...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage("Lien de vérification invalide.");
        return;
      }

      

      try {
        const response = await api.get(`/auth/verify/${token}`);

        

        setMessage(response.data.message);
        setSuccess(true);

        // Redirection vers login après 3 secondes
        setTimeout(() => {
          navigate("/login");
        }, 3000);

      } catch (error: any) {
        console.error("Erreur lors de la vérification :", error);

        setMessage(
          error.response?.data?.message ??
          "Impossible de vérifier votre compte."
        );
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <main className="verify-email-page"> 
       <div className="verify-email-sidebar" />  
         <section className="verify-email-main"> 
            <img src="/frameFond.png" alt="" className="verify-email-background" /> 
               <div className="verify-email-back"> 
                   <img src="/back-button.svg" alt="Back" onClick={() => navigate("/login")} /> 
               </div> {/* Carte */} <div className="verify-email-content"> <div className="verify-email-card"> 
                   <img src="/ozamba-logo.png" alt="Ozamba" className="verify-email-logo" /> 
                      <h1> {success ? ( <> ACCOUNT <br /> VERIFIED! </> ) : ( <> VERIFY YOUR <br /> ACCOUNT </> )} </h1>
                      <div className={ success ? "verify-email-icon success" : "verify-email-icon" } > {success ? "✓" : "!"} </div> 
                      <p className={success ? "success-message" : "error-message"}> {message} </p> {success && ( <p className="verify-email-redirect"> Vous allez être redirigé vers la page de connexion... </p> )} {!success && ( <button className="verify-email-button" onClick={() => navigate("/login")} > BACK TO LOGIN </button> )} 
                </div> 
        </div> 
                      <WorldClock /> <LanguageSelector /> 
            </section> 
      </main>
  );
}