import type{ Request, Response } from "express";
import type { RegisterUserData, RegisterUserResponse } from "../types/auth.interface.js";



interface AuthService {
  registerUser(
    data: RegisterUserData
  ): Promise<RegisterUserResponse>;
}




class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async registerUser(
    req: Request<{}, {}, RegisterUserData>,
    res: Response
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
        message:
          "Utilisateur créé avec succès. Vérifiez votre email.",
      });
    } catch (error: unknown) {
      console.error("Erreur dans registerUser :", error);

      res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "Erreur inconnue",
      });
    }
  }
}

export default AuthController;