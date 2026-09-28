import type { Gender, SportSlug } from "../config/sports";

// Données provisoires, à remplacer par l'appel GET /athletes quand le back sera prêt
export type Athlete = {
  id: number;
  name: string;
  position: string;
  team: string;
  number: string;
  image: string;
  gender: Gender;
  sport: SportSlug;
};

export const MOCK_ATHLETES: Athlete[] = [
  {
    id: 1,
    name: "Victor Wembanyama",
    position: "CENTER",
    team: "SAN ANTONIO SPURS",
    number: "01",
    image: "/athletes/victor-wembanyama.png",
    gender: "men",
    sport: "basketball",
  },
  {
    id: 2,
    name: "Stephen Curry",
    position: "POINT GUARD",
    team: "GOLDEN STATE WARRIORS",
    number: "02",
    image: "/athletes/stephen-curry.png",
    gender: "men",
    sport: "basketball",
  },
  {
    id: 3,
    name: "LeBron James",
    position: "SMALL FORWARD",
    team: "LOS ANGELES LAKERS",
    number: "03",
    image: "/athletes/lebron-james.png",
    gender: "men",
    sport: "basketball",
  },
];
