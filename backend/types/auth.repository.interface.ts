import type {User, NewUser}  from './user.interface.js'

interface AuthRepository {
  getUserByEmail(userEmail: string): Promise<User | null>;
  createUser(user: NewUser): Promise<number>;
}