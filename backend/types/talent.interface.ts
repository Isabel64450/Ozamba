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

// Fiche complète : toutes les colonnes de talents + le club du dernier contrat
export interface TalentDetail extends TalentListItem {
  gender: string | null;
  category: string | null;
  status: string | null;
  height?: number | null;  // en cm
  weight?: number | null;
  birthDate?: Date | null;
}
