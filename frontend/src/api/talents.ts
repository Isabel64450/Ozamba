import api from "./axios";
import type { NewTalent, TalentDetail, TalentListItem } from "../types/talent";

// Liste filtrée par section (men/women) et par sport
export async function getTalents(gender: string, sport: string): Promise<TalentListItem[]> {
  const { data } = await api.get<TalentListItem[]>("/talents", {
    params: { gender, category: sport },
  });
  return data;
}

export async function getTalentById(id: string): Promise<TalentDetail> {
  const { data } = await api.get<TalentDetail>(`/talents/${id}`);
  return data;
}

// Crée un talent et renvoie son id
export async function createTalent(talent: NewTalent): Promise<number> {
  const { data } = await api.post<{ id: number }>("/talents", talent);
  return data.id;
}
