import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WorldClock from "../components/WorldClock";
import LanguageSelector from "../components/LanguageSelector";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!password.trim()) {
      setPasswordError("Please enter a password.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!confirm.trim()) {
      setConfirmError("Please confirm your password.");
      hasError = true;
    } else if (password !== confirm) {
      setConfirmError("Passwords do not match.");
      hasError = true;
    } else {
      setConfirmError("");
    }

    if (hasError) return;

    await fetch("http://localhost:3000/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    setSuccess(true);
    setTimeout(() => navigate("/login"), 2000);
  };

  const pageStyle: React.CSSProperties = {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  };

  const sidebarStyle: React.CSSProperties = {
    width: "80px",
    background: "#2B3A8F",
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

  if (success) {
    return (
      <div style={pageStyle}>
        <div style={sidebarStyle} />
        <div style={{ ...mainStyle, alignItems: "center", justifyContent: "center" }}>
          <div style={cardStyle}>
            <img src="/ozamba-logo.png" alt="Ozamba" style={{ height: "60px", marginBottom: "20px" }} />
            <h1 style={{ color: "#2B3A8F", fontSize: "26px", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.2 }}>
              PASSWORD UPDATED !
            </h1>
            <p style={{ color: "#CC0000", fontSize: "14px", margin: "0 0 24px" }}>
              Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={sidebarStyle} />

      <div style={mainStyle}>
        <img
          src="/frameFond.png"
          alt=""
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            height: "170vh",
            width: "auto",
            maxWidth: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Bouton BACK */}
        <div style={{ padding: "20px 24px", position: "relative", zIndex: 1 }}>
          <img
            src="/back-button.svg"
            alt="Back"
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", height: "52px" }}
          />
        </div>

        {/* Carte formulaire centrée */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
          <div style={cardStyle}>
            <img src="/ozamba-logo.png" alt="Ozamba" style={{ height: "60px", marginBottom: "20px" }} />

            <h1 style={{ color: "#2B3A8F", fontSize: "24px", fontWeight: 800, margin: "0 0 24px", lineHeight: 1.2 }}>
              CREATE YOUR NEW
              <br />
              PASSWORD
            </h1>

            <form onSubmit={handleSubmit} noValidate>
              {/* Champ nouveau mot de passe */}
              <div style={{ marginBottom: "8px" }}>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}>
                    <svg width="20" height="20" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.5001 10.2V13.6C27.3701 13.6 28.9001 15.13 28.9001 17V28.9C28.9001 30.77 27.3701 32.2999 25.5001 32.2999H8.5001C6.6301 32.2999 5.1001 30.77 5.1001 28.9V17C5.1001 15.13 6.6301 13.6 8.5001 13.6V10.2C8.5001 5.50795 12.3081 1.69995 17.0001 1.69995C21.6921 1.69995 25.5001 5.50795 25.5001 10.2ZM13.6001 10.2V13.6H20.4001V10.2C20.4001 8.32995 18.8701 6.79995 17.0001 6.79995C15.1301 6.79995 13.6001 8.32995 13.6001 10.2ZM18.3601 27.625V23.9359C19.5501 23.409 20.4001 22.219 20.4001 20.825C20.4001 18.955 18.8701 17.425 17.0001 17.425C15.1301 17.425 13.6001 18.955 13.6001 20.825C13.6001 22.219 14.4501 23.409 15.6401 23.9359V27.625H18.3601Z" fill="#2F4798"/></svg>
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Write your new password ..."
                    style={{
                      width: "100%",
                      padding: "12px 12px 12px 40px",
                      border: `1px solid ${passwordError ? "#CC0000" : "#2B3A8F"}`,
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                      color: "#333",
                    }}
                  />
                </div>
                {/* Barre de force du mot de passe */}
                <div style={{ height: "4px", background: "#eee", borderRadius: "2px", margin: "6px 0" }}>
                  <div
                    style={{
                      height: "100%",
                      width: password.length > 8 ? "66%" : password.length > 4 ? "33%" : password.length > 0 ? "15%" : "0",
                      background: password.length > 8 ? "#22c55e" : "#CC0000",
                      borderRadius: "2px",
                      transition: "width 0.3s",
                    }}
                  />
                </div>
                <p style={{ fontSize: "11px", color: "#CC0000", textAlign: "right", margin: "0 0 4px" }}>
                  {password.length > 8 ? "GOOD" : password.length > 0 ? "POOR" : ""}
                </p>
                {passwordError && (
                  <p style={{ color: "#CC0000", fontSize: "13px", margin: "0 0 8px", textAlign: "left" }}>
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Champ confirmation */}
              <div style={{ marginBottom: "8px" }}>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}>
                    <svg width="20" height="20" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.5001 10.2V13.6C27.3701 13.6 28.9001 15.13 28.9001 17V28.9C28.9001 30.77 27.3701 32.2999 25.5001 32.2999H8.5001C6.6301 32.2999 5.1001 30.77 5.1001 28.9V17C5.1001 15.13 6.6301 13.6 8.5001 13.6V10.2C8.5001 5.50795 12.3081 1.69995 17.0001 1.69995C21.6921 1.69995 25.5001 5.50795 25.5001 10.2ZM13.6001 10.2V13.6H20.4001V10.2C20.4001 8.32995 18.8701 6.79995 17.0001 6.79995C15.1301 6.79995 13.6001 8.32995 13.6001 10.2ZM18.3601 27.625V23.9359C19.5501 23.409 20.4001 22.219 20.4001 20.825C20.4001 18.955 18.8701 17.425 17.0001 17.425C15.1301 17.425 13.6001 18.955 13.6001 20.825C13.6001 22.219 14.4501 23.409 15.6401 23.9359V27.625H18.3601Z" fill="#2F4798"/></svg>
                  </span>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Confirm your new password ..."
                    style={{
                      width: "100%",
                      padding: "12px 40px 12px 40px",
                      border: `1px solid ${confirmError ? "#CC0000" : "#2B3A8F"}`,
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                      color: "#333",
                    }}
                  />
                  {confirm && confirm === password && (
                    <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }}>
                      <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 27.5C21.9037 27.5 27.5 21.9037 27.5 15C27.5 8.09625 21.9037 2.5 15 2.5C8.09625 2.5 2.5 8.09625 2.5 15C2.5 21.9037 8.09625 27.5 15 27.5Z" stroke="#21D51E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M11.25 15L13.75 17.5L18.75 12.5" stroke="#21D51E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </div>
                {confirmError && (
                  <p style={{ color: "#CC0000", fontSize: "13px", margin: "4px 0 0", textAlign: "left" }}>
                    {confirmError}
                  </p>
                )}
              </div>

              {/* Règles mot de passe */}
              <div style={{ fontSize: "11px", color: "#A7B0D0", textAlign: "left", margin: "4px 0 20px", lineHeight: 2, display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_1017_21)"><path d="M6 11C8.7615 11 11 8.7615 11 6C11 3.2385 8.7615 1 6 1C3.2385 1 1 3.2385 1 6C1 8.7615 3.2385 11 6 11Z" stroke="#A7B0D0" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.5 6L5.5 7L7.5 5" stroke="#A7B0D0" strokeLinecap="round" strokeLinejoin="round"/></g><defs><clipPath id="clip0_1017_21"><rect width="12" height="12" fill="white"/></clipPath></defs></svg> MAJ</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_1017_21)"><path d="M6 11C8.7615 11 11 8.7615 11 6C11 3.2385 8.7615 1 6 1C3.2385 1 1 3.2385 1 6C1 8.7615 3.2385 11 6 11Z" stroke="#A7B0D0" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.5 6L5.5 7L7.5 5" stroke="#A7B0D0" strokeLinecap="round" strokeLinejoin="round"/></g><defs><clipPath id="clip0_1017_21"><rect width="12" height="12" fill="white"/></clipPath></defs></svg> NUMBER: 0123456789</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_1017_21)"><path d="M6 11C8.7615 11 11 8.7615 11 6C11 3.2385 8.7615 1 6 1C3.2385 1 1 3.2385 1 6C1 8.7615 3.2385 11 6 11Z" stroke="#A7B0D0" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.5 6L5.5 7L7.5 5" stroke="#A7B0D0" strokeLinecap="round" strokeLinejoin="round"/></g><defs><clipPath id="clip0_1017_21"><rect width="12" height="12" fill="white"/></clipPath></defs></svg> SPECIAL CHARACTERS: @"('/),?.;*-_</span>
              </div>

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
                CONFIRM
              </button>
            </form>
          </div>
        </div>

        <WorldClock />
        <LanguageSelector />
      </div>
    </div>
  );
}
