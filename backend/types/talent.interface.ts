import type { RowDataPacket } from "mysql2";

export interface TalentFilters {
  gender?: string| undefined;
  category?: string| undefined;
}

export interface TalentListItem extends RowDataPacket {
  firstName: string;
  lastName: string;
  number: number | null;
  position: string | null;
}