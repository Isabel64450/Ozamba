import argon2 from "argon2";
import type{NewUser, User} from '../types/user.interface.js'
import type { Pool, ResultSetHeader } from "mysql2/promise";



class AuthRepository {
  constructor(private pool: Pool) {}

   async createUser(userData: NewUser): Promise<number> {
    const {
      userName,
      lastName,
      name,
      email,
      birthDate,
      phoneNumber,
      facebook,
      twitter,
      tiktok,
      job,
      category,
      password,
    } = userData;

    try {
      // Hash du mot de passe avant l'enregistrement
      const hashedPassword = await argon2.hash(password);

      const [result] = await this.pool.query<ResultSetHeader>(
        `INSERT INTO users (
          userName,
          lastName,
          name,
          email,
          birthDate,
          phoneNumber,
          facebook,
          twitter,
          tiktok,
          job,
          category,
          password
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userName,
          lastName,
          name,
          email,
          birthDate ?? null,
          phoneNumber ?? null,
          facebook ?? null,
          twitter ?? null,
          tiktok ?? null,
          job ?? null,
          category ?? null,
          hashedPassword,
        ]
      );

      return result.insertId;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(
          "Erreur dans AuthRepository.createUser :",
          err.message
        );
      }

      throw new Error("Erreur lors de l'insertion de l'utilisateur");
    }
  }

  
  async getUserByEmail(email: string): Promise<User | null> {
    const [rows] = await this.pool.query<User[]>(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    return rows[0] ?? null;
  }

  /**
   * Récupérer un utilisateur par son ID
   */
  async getUserById(id: number): Promise<User | null> {
    const [rows] = await this.pool.query<User[]>(
      `SELECT * FROM users WHERE id = ? LIMIT 1`,
      [id]
    );

    return rows[0] ?? null;
  }
}

export default AuthRepository;