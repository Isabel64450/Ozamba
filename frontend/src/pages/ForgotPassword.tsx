import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError("Veuillez renseigner votre adresse email.");
      return;
    }

    setEmailError("");

    await fetch("http://localhost:3000/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setSubmitted(true);
  };

  const pageStyle: React.CSSProperties = {
    display: "flex",
    minHeight: "100vh",
  };

  const sidebarStyle: React.CSSProperties = {
    width: "55px",
    background: "#2B3A8F",
    minHeight: "100vh",
    flexShrink: 0,
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "white",
    position: "relative",
    overflow: "hidden",
  };

  const cardStyle: React.CSSProperties = {
    background: "white",
    borderRadius: "12px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  };

  if (submitted) {
    return (
      <div style={pageStyle}>
        <div style={sidebarStyle} />
        <div
          style={{
            ...mainStyle,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={cardStyle}>
            <img
              src="/ozamba-logo.png"
              alt="Ozamba"
              style={{ height: "60px", marginBottom: "20px" }}
            />
            <h1
              style={{
                color: "#2B3A8F",
                fontSize: "26px",
                fontWeight: 800,
                margin: "0 0 16px",
                lineHeight: 1.2,
              }}
            >
              EMAIL SENT !
            </h1>
            <p
              style={{ color: "#CC0000", fontSize: "14px", margin: "0 0 24px" }}
            >
              Si cette adresse existe, un lien de réinitialisation a été envoyé.
            </p>
            <button
              onClick={() => navigate("/login")}
              style={{
                width: "100%",
                background: "#2B3A8F",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "13px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "1px",
              }}
            >
              RETOUR À LA CONNEXION
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* Barre latérale fine */}
      <div style={sidebarStyle} />

      {/* Contenu principal avec pattern en fond */}
      <div style={mainStyle}>
        {/* Pattern uniquement sur la droite */}
        <img
          src="/frameFond.png"
          alt=""
          style={{
            position: "absolute",
            top: "-10%",
            right: "-25%",
            height: "170vh",
            width: "auto",
            maxWidth: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Bouton BACK */}
        <div style={{ padding: "20px 24px", position: "relative", zIndex: 1 }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#CC0000",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "1px",
            }}
          >
            ‹ BACK
          </button>
        </div>

        {/* Carte formulaire centrée */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={cardStyle}>
            {/* Logo */}
            <img
              src="/ozamba-logo.png"
              alt="Ozamba"
              style={{ height: "60px", marginBottom: "20px" }}
            />

            {/* Titre */}
            <h1
              style={{
                color: "#2B3A8F",
                fontSize: "26px",
                fontWeight: 800,
                margin: "0 0 16px",
                lineHeight: 1.2,
              }}
            >
              FORGOT YOUR
              <br />
              PASSWORD?
            </h1>

            {/* Sous-titre */}
            <p
              style={{ color: "#CC0000", fontSize: "14px", margin: "0 0 24px" }}
            >
              Confirm your email and we'll send the instructions
            </p>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ position: "relative", marginBottom: "12px" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#2B3A8F",
                    fontWeight: 600,
                  }}
                >
                  @
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Write your email here ..."
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 36px",
                    border: `1px solid ${emailError ? "#CC0000" : "#2B3A8F"}`,
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#333",
                  }}
                />
              </div>
              {emailError && (
                <p
                  style={{
                    color: "#CC0000",
                    fontSize: "13px",
                    margin: "0 0 12px",
                    textAlign: "left",
                  }}
                >
                  {emailError}
                </p>
              )}

              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#2B3A8F",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "13px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: "1px",
                }}
              >
                RESET PASSWORD
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
