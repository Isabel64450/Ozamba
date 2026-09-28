// Configuration des sections et des sports : les pages Talents lisent ces données

export type Gender = "men" | "women";
export type SportSlug = "basketball" | "football" | "volleyball" | "flag" | "hockey";

export type SportConfig = {
  label: string;
  image?: string;       // fond de la carte « Choose the category »
  courts: string[];     // images des terrains (vide = pas encore fourni)
  positions: string[];  // postes proposés dans le filtre
  genders: Gender[];    // sections où ce sport existe
};

export const GENDERS: Record<Gender, string> = {
  men: "Men's Sports",
  women: "Women's Sports",
};

export const SPORTS: Record<SportSlug, SportConfig> = {
  basketball: {
    label: "Basketball",
    image: "/Group 33954.png",
    courts: ["/courts/basketball-attack.svg", "/Group 34103.png"],
    positions: ["C", "PF", "SG/SF", "PG"],
    genders: ["men", "women"],
  },
  football: {
    label: "Football",
    image: "/Group 33955.png",
    courts: ["/courts/football-left.svg", "/courts/football-right.svg"],
    positions: ["GK", "DEF", "MID", "FWD"],
    genders: ["men", "women"],
  },
  volleyball: {
    label: "Volleyball",
    image: "/Group 34101.png",
    courts: ["/courts/volleyball-left.svg", "/courts/volleyball-right.svg"],
    positions: ["OH", "MB", "SET", "O", "RH", "L"],
    genders: ["men", "women"],
  },
  flag: {
    label: "Flag",
    courts: [],
    positions: [],
    genders: ["women"],
  },
  hockey: {
    label: "Hockey",
    courts: [],
    positions: [],
    genders: ["women"],
  },
};

// Vérifie qu'une valeur venant de l'URL est une section connue
export function isGender(value: string | undefined): value is Gender {
  return value !== undefined && value in GENDERS;
}

// Vérifie qu'une valeur venant de l'URL est un sport connu
export function isSport(value: string | undefined): value is SportSlug {
  return value !== undefined && value in SPORTS;
}

// Liste des sports disponibles pour une section
export function getSportsFor(gender: Gender): [SportSlug, SportConfig][] {
  return (Object.entries(SPORTS) as [SportSlug, SportConfig][]).filter(
    ([, sport]) => sport.genders.includes(gender)
  );
}
