// Formes des données renvoyées par GET /talents et GET /talents/:id

export type TalentListItem = {
  id: number;
  photo: string | null;
  firstName: string;
  lastName: string;
  club: string | null;
  position: string | null;
  number: string | null;
  contractEnded: string | null; // date au format ISO (JSON)
};

export type TalentDetail = TalentListItem & {
  gender: string | null;
  category: string | null;
  status: string | null;   // ex. under_development
  height?: number | null;  // en cm
  weight?: number | null;
  birthDate?: string | null;
};
