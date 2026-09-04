import argon2 from "argon2";
import jwt from "jsonwebtoken";
import type { NewUser, User } from "../types/user.interface.js";
import type { RegisterUserData, RegisterUserResponse } from "../types/auth.interface.js";




interface AuthRepository {
  getUserByEmail(userEmail: string): Promise<User | null>;
  createUser(user: NewUser): Promise<number>;
  saveResetToken(email: string, token: string, expire: Date): Promise<void>;
  getUserByResetToken(token: string): Promise<User | null>;
  updatePassword(userId: number, hashedPassword: string): Promise<void>;
}





class AuthService {
  private authRepository: AuthRepository;
 
  

  constructor(
    authRepository: AuthRepository,
    
   
  ) {
    this.authRepository = authRepository;
   
    
  }

  async registerUser(
    userData: RegisterUserData
  ): Promise<RegisterUserResponse> {
    const {
       userName,
      lastName,
      name,
      email,
      password,
      confirmPassword,
      birthDate,
      phoneNumber,
      facebook,
      twitter,
      tiktok,
      job,
      category,
    } = userData;

    const existingUser =
      await this.authRepository.getUserByEmail(email);

    if (existingUser) {
      throw new Error("L'utilisateur existe déjà");
    }

    if (password !== confirmPassword) {
      throw new Error("Les mots de passe doivent être identiques");
    }

   



    const newUser: NewUser = {
      userName,
      lastName,
      name,
      email,
      password,

      birthDate: birthDate ?? null,
      phoneNumber: phoneNumber ?? null,

      facebook: facebook ?? null,
      twitter: twitter ?? null,
      tiktok: tiktok ?? null,

      job: job ?? null,
      category: category ?? null,
    };

    const userId =
      await this.authRepository.createUser(newUser);

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET n'est pas défini");
    }

    const verificationToken = jwt.sign(
      {
        id: userId,
      },
      jwtSecret,
      {
        expiresIn: "1d",
      }
    );

    const clientFront = process.env.CLIENT_FRONT;

    if (!clientFront) {
      throw new Error("CLIENT_FRONT n'est pas défini");
    }

    const verificationUrl =
      `${clientFront}/verify-email/${verificationToken}`;

    

    return {
      success: true,
      message:
        "Utilisateur créé avec succès. Vérifiez votre email.",
    };
  }

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  
  const user = await this.authRepository.getUserByEmail(email);
  if (!user) {
    
    return { success: true, message: "If this email exists, a link has been sent to you." };
  }

  const token = crypto.randomUUID();

  const expire = new Date(Date.now() + 60 * 60 * 1000);

  await this.authRepository.saveResetToken(email, token, expire);

  return { success: true, message: "If this email exists, a link has been sent to you." };
}

async resetPassword(token: string, password: string, confirmPassword: string): Promise<{ success: boolean; message: string }> {
  
  if (password !== confirmPassword) {
    throw new Error("Passwords must be identical");
  }

  const user = await this.authRepository.getUserByResetToken(token);
  if (!user) {
    throw new Error("Invalid or expired token");
  }

  const hashedPassword = await argon2.hash(password);

  await this.authRepository.updatePassword(user.id, hashedPassword);

  return { success: true, message: "Password successfully reset." };
}
 
}

export default AuthService;
