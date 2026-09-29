import type { Pool } from "mysql2/promise";
import type { TalentListItem, TalentFilters } from "../types/talent.interface.js";

class TalentRepository {
  constructor(private pool: Pool) {}

  async getTalents(filters: TalentFilters): Promise<TalentListItem[]> {
    const { gender, category } = filters;

    let query = `
        SELECT
    t.photo,
    t.firstName,
    t.lastName,
    c.name AS club,
    t.position,
    t.number,
    p.endDate AS contractEnded
  FROM talents t
  LEFT JOIN placements p
    ON p.talentId = t.id
  LEFT JOIN clubs c
    ON c.id = p.clubId
    `;

    const conditions: string[] = [];
    const values: string[] = [];

    if (gender) {
      conditions.push("t.gender = ?");
      values.push(gender);
    }

    if (category) {
      conditions.push("t.category = ?");
      values.push(category);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += ` ORDER BY t.createdAt ASC`;

    const [rows] = await this.pool.query<TalentListItem[]>(query, values);

    return rows;
  }
}

export default TalentRepository;
