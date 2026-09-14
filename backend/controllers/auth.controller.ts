import type { Request, Response } from "express";
import type {
  RegisterUserData,
  RegisterUserResponse,
  ForgotPasswordData,
  ResetPasswordData,
} from "../types/auth.interface.js";

interface AuthService {
  registerUser(data: RegisterUserData): Promise<RegisterUserResponse>;
  forgotPassword(email: string): Promise<{ success: boolean; message: string }>;
  resetPassword(
    token: string,
    password: string,
    confirmPassword: string,
  ): Promise<{ success: boolean; message: string }>;
}

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async registerUser(
    req: Request<{}, {}, RegisterUserData>,
    res: Response,
  ): Promise<void> {
    try {
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
      } = req.body;

      // Vérification des champs obligatoires
      if (
        !userName ||
        !lastName ||
        !name ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        res.status(400).json({
          error: "Tous les champs obligatoires doivent être remplis.",
        });
        return;
      }

      // Vérification du mot de passe
      if (password !== confirmPassword) {
        res.status(400).json({
          message: "Les mots de passe doivent être identiques.",
        });
        return;
      }

      // Appel du service
      await this.authService.registerUser({
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
      });

      res.status(201).json({
        success: true,
        message: "Utilisateur créé avec succès. Vérifiez votre email.",
      });
    } catch (error: unknown) {
      console.error("Erreur dans registerUser :", error);

      res.status(400).json({
        error: error instanceof Error ? error.message : "Erreur inconnue",
      });
    }
  }

  async forgotPassword(
    req: Request<{}, {}, ForgotPasswordData>,
    res: Response,
  ): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ error: "Email is required" });
        return;
      }

      await this.authService.forgotPassword(email);

      res.status(200).json({
        success: true,
        message: "If this email exists, a link has been sent to you.",
      });
    } catch (error: unknown) {
      console.error("Error in forgotPassword :", error);
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
  
  async resetPassword(
    req: Request<{}, {}, ResetPasswordData>,
    res: Response,
  ): Promise<void> {
    try {
      const token = req.query.token as string;
      const { password, confirmPassword } = req.body;

      if (!token) {
        res.status(400).json({ error: "Token is required" });
        return;
      }

      if (!password || !confirmPassword) {
        res
          .status(400)
          .json({ error: "Password and confirmation are required" });
        return;
      }

      await this.authService.resetPassword(token, password, confirmPassword);

      res
        .status(200)
        .json({ success: true, message: "Password successfully reset." });
    } catch (error: unknown) {
      console.error("Error in resetPassword :", error);
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export default AuthController;
