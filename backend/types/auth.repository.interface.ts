import type {User, NewUser} from './user.interface.js'

interface AuthRepository {
  getUserByEmail(userEmail: string): Promise<User | null>;
  createUser(user: NewUser): Promise<number>;
  saveResetToken(email: string, token: string, expire: Date): Promise<void>;
  getUserByResetToken(token: string): Promise<User | null>;
  updatePassword(userId: number, hashedPassword: string): Promise<void>;
}