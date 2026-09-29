import type { RowDataPacket } from "mysql2";

export interface TalentFilters {
  gender?: string| undefined;
  category?: string| undefined;
}

export interface TalentListItem extends RowDataPacket {
  photo: string | null;
  firstName: string;
  lastName: string;
  club: string | null;
  position: string | null;
  number: string | null;
  contractEnded: Date | null;
}
