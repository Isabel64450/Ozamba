import argon2 from "argon2";
import type{NewUser, User} from '../types/user.interface.js'
import type { Pool, ResultSetHeader } from "mysql2/promise";



class AuthRepository {
  constructor(private pool: Pool) {}

  async createUser(userData: NewUser): Promise<number> {
    const {
      
      userName,
      userLastName,
      userEmail,
      adress_delivery,
      password,
    } = userData;

    try {
      // On hash le mot de passe avant de l'enregistrer
      const hashedPassword = await argon2.hash(password);

      const [result] = await this.pool.query<ResultSetHeader>(
        `INSERT INTO users 
          (customer_id, userName, userLastName, userEmail, adress_delivery, password)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
         
          userName,
          userLastName,
          userEmail,
          adress_delivery,
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



  async getUserByEmail(userEmail: string): Promise<User | null> {
    const [rows] = await this.pool.query<User[]>(
      `SELECT * FROM users WHERE userEmail = ? LIMIT 1`,
      [userEmail]
    );

    return  rows[0] ?? null;
  }
}

export default AuthRepository;