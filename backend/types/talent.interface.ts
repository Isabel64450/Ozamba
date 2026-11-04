import type { RowDataPacket } from "mysql2";

export interface TalentFilters {
  gender?: string| undefined;
  category?: string| undefined;
}

export interface TalentListItem extends RowDataPacket {
  id: number;
  photo: string | null;
  firstName: string;
  lastName: string;
  club: string | null;
  position: string | null;
  number: string | null;
  contractEnded: Date | null;
}

// Corps de POST /talents (formulaire New Athlete)
export interface CreateTalentInput {
  gender: string;      // men | women
  category: string;    // slug du sport : basketball, football...
  firstName: string;
  lastName: string;
  position?: string | null;
  number?: string | null;
  birthDate?: string | null;  // YYYY-MM-DD
  height?: number | null;     // en cm
  weight?: number | null;     // en kg
  photo?: string | null;
  clubId?: number | null;
}

// Fiche complète : toutes les colonnes de talents + le club du dernier contrat
export interface TalentDetail extends TalentListItem {
  gender: string | null;
  category: string | null;
  status: string | null;
  height?: number | null;  // en cm
  weight?: number | null;
  birthDate?: Date | null;
}
