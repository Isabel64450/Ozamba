import type { Pool } from "mysql2/promise";
import type { TalentListItem, TalentFilters } from "../types/talent.interface.js";

class TalentRepository {
  constructor(private pool: Pool) {}

  async getTalents(filters: TalentFilters): Promise<TalentListItem[]> {
    const { gender, category } = filters;

    let query = `
      SELECT
      
        firstName,
        lastName,
      
        sport,
        position,
        number,
       
        category
        FROM talents
    `;

    const conditions: string[] = [];
    const values: string[] = [];

    if (gender) {
      conditions.push("gender = ?");
      values.push(gender);
    }

    if (category) {
      conditions.push("category = ?");
      values.push(category);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += ` ORDER BY createdAt ASC`;

    const [rows] = await this.pool.query<TalentListItem[]>(query, values);

    return rows;
  }
}

export default TalentRepository;
