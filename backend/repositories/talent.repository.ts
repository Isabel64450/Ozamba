import type { Pool } from "mysql2/promise";
import type { TalentListItem, TalentFilters, TalentDetail } from "../types/talent.interface.js";

class TalentRepository {
  constructor(private pool: Pool) {}

  async getTalents(filters: TalentFilters): Promise<TalentListItem[]> {
    const { gender, category } = filters;

    let query = `
        SELECT
    t.id,
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

  // Un seul talent ; s'il a plusieurs contrats, on garde celui qui finit le plus tard
  async getTalentById(id: number): Promise<TalentDetail | null> {
    const query = `
      SELECT
        t.*,
        c.name AS club,
        p.endDate AS contractEnded
      FROM talents t
      LEFT JOIN placements p
        ON p.talentId = t.id
      LEFT JOIN clubs c
        ON c.id = p.clubId
      WHERE t.id = ?
      ORDER BY p.endDate DESC
      LIMIT 1
    `;

    const [rows] = await this.pool.query<TalentDetail[]>(query, [id]);

    return rows[0] ?? null;
  }
}

export default TalentRepository;
