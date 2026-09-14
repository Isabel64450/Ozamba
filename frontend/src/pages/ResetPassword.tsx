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
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>
                    🔒
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
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>
                    🔒
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
                    <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#22c55e", fontSize: "16px" }}>
                      ✓
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
              <p style={{ fontSize: "11px", color: "#666", textAlign: "left", margin: "4px 0 20px", lineHeight: 1.6 }}>
                © MIN 8 CHARACTERS
                <br />
                © NUMBER: 0123456789
                <br />© SPECIAL CHARACTERS: @*?!,?,-
              </p>

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
