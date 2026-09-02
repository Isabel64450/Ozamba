import { useState, type FormEvent } from "react"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import api from "../api/axios"; 
import WorldClock from "../components/WorldClock"; 
import LanguageSelector from "../components/LanguageSelector"; 
import "../styles/Login.css"; 



export default function Login() { 
    const navigate = useNavigate(); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [emailError, setEmailError] = useState(""); 
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false); 
    
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setEmailError(""); setError(""); 
        if (!email.trim()) { setEmailError("Veuillez renseigner votre adresse email."); 
            return; } if (!password.trim()) { setError("Veuillez renseigner votre mot de passe."); 
                return; } 
        try { setLoading(true); 
        const response = await api.post("/auth/login", { email, password, }); 
        
        
        localStorage.setItem("token", response.data.token); navigate("/"); } 
        catch (error: unknown) { if (axios.isAxiosError(error)) { setError( error.response?.data?.message ?? error.response?.data?.error ?? "Adresse email ou mot de passe incorrect." ); }
         else { setError("Une erreur est survenue lors de la connexion."); } } 
         finally { setLoading(false); } }; 
         return (
            
            <main className="login-page"> 
                <div className="login-sidebar" /> 
                   <section className="login-main"> 
                       <img src="/frameFond.png" alt="" className="login-background" /> 
                           <div className="login-back-container"> 
                              <img src="/back-button.svg" alt="Back" className="login-back" onClick={() => navigate("/")} /> 
                           </div> 
                                 <div className="login-content"> 
                                    <div className="login-card"> 
                                        <img src="/ozamba-logo.png" alt="Ozamba" className="login-logo" /> 
                                              <h1 className="login-title"> CONNECT </h1> 
                                               
                                               <form className="login-form" onSubmit={handleSubmit} noValidate > 
                                                <div className="login-field"> 
                                                    <label htmlFor="email"> EMAIL </label> 
                                                    <div className="login-input-wrapper"> 
                                                        <span className="login-input-icon"> @ </span>
                                                         <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Write your email here ..." className={emailError ? "input-error" : ""} /> 
                                                    </div> {emailError && ( <p className="login-error"> {emailError} </p> )} 
                                                </div> 
                                                 
                                                         <div className="login-field"> 
                                                            <label htmlFor="password"> PASSWORD </label> 
                                                            <div className="login-input-wrapper"> 
                                                                <span className="login-input-icon"> 🔒 </span> 
                                                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Write your password here ..." />
                                                             </div>
                                                         </div> 
                                                <button type="button" className="login-forgot" onClick={() => navigate("/forgot-password")} > Forgot your password? </button> {/* ERREUR */} {error && ( <p className="login-error login-error-global"> {error} </p> )} {/* BOUTON */} 
                                                <button type="submit" className="login-submit" disabled={loading} > {loading ? "CONNECTING..." : "LOGIN"} </button> 
                                                </form> 
                                                
                                                 </div>
                                                 </div> <WorldClock /> <LanguageSelector />
                                                 
                                         </section> 
                                    </main> );

                                    }