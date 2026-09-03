import type{ Request, Response } from "express";
import type { LoginUserData, LoginUserResponse, RegisterUserData, RegisterUserResponse } from "../types/auth.interface.js";



interface AuthService {
  registerUser( data: RegisterUserData): Promise<RegisterUserResponse>;
    verifyEmail(token: string): Promise<{ alreadyVerified: boolean; }>;
    loginUser(data: LoginUserData):Promise<LoginUserResponse>;
}
interface VerifyEmailParams {
  token: string;
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
        address,
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
        address,
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


 async verifyEmail(req: Request<VerifyEmailParams>, res: Response): Promise<Response> {

    try {
      const { token } = req.params;

      if (!token) {
        return res.status(400).json({
          message: "Token de vérification manquant",
        });
      }

      const result = await this.authService.verifyEmail(token);

      if (result.alreadyVerified) {
        return res.status(200).json({
          message: "Compte déjà vérifié",
          alreadyVerified: true,
        });
      }

      return res.status(200).json({
        message: "Votre compte a été vérifié avec succès",
        alreadyVerified: false,
      });

    } catch (error) {

      if (error instanceof Error) {

        if (error.message === "TOKEN_EXPIRED") {
          return res.status(400).json({
            message: "Le lien de vérification a expiré.",
          });
        }

        if (error.message === "INVALID_TOKEN") {
          return res.status(400).json({
            message: "Le lien de vérification est invalide.",
          });
        }

        if (error.message === "USER_NOT_FOUND") {
          return res.status(404).json({
            message: "Utilisateur non trouvé",
          });
        }
      }

      console.error(
        "Erreur lors de la vérification de l'email :",
        error
      );

      return res.status(500).json({
        message: "Erreur lors de la vérification de l'email",
      });
    }
  }


 async loginUser(
    req: Request,
    res: Response
  ): Promise<Response> {

    try {

      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email et mot de passe obligatoires",
        });
      }

      const result = await this.authService.loginUser({
        email,
        password,
      });

      return res.status(200).json(result);

    } catch (error) {

      if (error instanceof Error) {

        if (error.message === "INVALID_CREDENTIALS") {
          return res.status(401).json({
            message: "Email ou mot de passe incorrect",
          });
        }

        if (error.message === "EMAIL_NOT_VERIFIED") {
          return res.status(403).json({
            message: "Veuillez vérifier votre adresse email avant de vous connecter.",
          });
        }
      }

      console.error(
        "Erreur lors de la connexion :",
        error
      );

      return res.status(500).json({
        message: "Erreur lors de la connexion",
      });
    }
  }
















  
}

export default AuthController;