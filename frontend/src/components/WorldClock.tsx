import { useState, useEffect } from "react";

const ZONES = [
  { label: "LOCAL TIME PARIS", tz: "Europe/Paris" },
  { label: "TIME IN U. STATES", tz: "America/New_York" },
  { label: "TIME IN BRAZIL", tz: "America/Sao_Paulo" },
];

function getTime(tz: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: tz,
  }).format(new Date());
}

export default function WorldClock() {
  const [times, setTimes] = useState(() => ZONES.map((z) => getTime(z.tz)));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimes(ZONES.map((z) => getTime(z.tz)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
        display: "flex",
        gap: "6px",
        zIndex: 100,
      }}
    >
      {ZONES.map((zone, i) => (
        <div
          key={zone.tz}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(255,255,255,0.85)",
            borderRadius: "8px",
            padding: "4px 8px",
            boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#2B3A8F" strokeWidth="2" />
            <path d="M12 7v5l3 3" stroke="#2B3A8F" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div>
            <div style={{ fontSize: "8px", color: "#CC0000", fontWeight: 700, letterSpacing: "0.5px" }}>
              {zone.label}
            </div>
            <div style={{ fontSize: "13px", color: "#2B3A8F", fontWeight: 800, lineHeight: 1.1 }}>
              {times[i]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
