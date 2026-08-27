export default function LanguageSelector() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: "12px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        zIndex: 100,
        cursor: "pointer",
      }}
    >
      <img src="/langue.png" alt="EN" style={{ height: "20px", width: "auto" }} />
    </div>
  );
}
