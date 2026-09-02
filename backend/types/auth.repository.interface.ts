import type {User, NewUser}  from './user.interface.js'

export interface AuthRepository {
  getUserByEmail(userEmail: string): Promise<User | null>;
  createUser(user: NewUser): Promise<number>;
   getUserById(id: number): Promise<User | null>;
  markUserAsVerified(id: number): Promise<void>;
}