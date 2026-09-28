import { useState, useEffect } from "react";
import "../styles/WorldClock.css";

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

  // Styles dans WorldClock.css : le style inline ne permet pas les media queries
  return (
    <div className="world-clock">
      {ZONES.map((zone, i) => (
        <div key={zone.tz} className="world-clock-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#2B3A8F" strokeWidth="2" />
            <path d="M12 7v5l3 3" stroke="#2B3A8F" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div>
            <div className="world-clock-label">{zone.label}</div>
            <div className="world-clock-time">{times[i]}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
