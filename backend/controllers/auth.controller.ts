import type{ Request, Response } from "express";


interface AuthService {
  registerUser(data: RegisterUserData): Promise<RegisterUserResponse>;
}

interface RegisterUserData {
  userName: string;
  userLastName: string;
  userEmail: string;
  password: string;
  adress_delivery:number;
}

interface RegisterUserResponse {
  success: boolean;
  message: string;
}



interface RegisterRequestBody {
  userName: string;
  userLastName: string;
  userEmail: string;
  password: string;
  confirmPassword: string;
  adress_delivery: number;
}

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async registerUser(
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response
  ): Promise<void> {
    try {
      const {
        userName,
        userLastName,
        userEmail,
        password,
        confirmPassword,
        adress_delivery
      } = req.body;

      if (
        !userName ||
        !userLastName ||
        !userEmail ||
        !password ||
        !confirmPassword ||
        !adress_delivery
      ) {
        res.status(400).json({
          error: "Tous les champs sont obligatoires.",
        });
        return;
      }

      if (password !== confirmPassword) {
        res.status(400).json({
          message: "Les mots de passe doivent être identiques",
        });
        return;
      }

      await this.authService.registerUser({
        userName,
        userLastName,
        userEmail,
        password,
        adress_delivery,
      });

      res.status(201).json({
        message: "Utilisateur créé avec succès. Vérifiez votre email.",
      });
    } catch (error: unknown) {
      console.error("Erreur dans registerUser:", error);

      res.status(400).json({
        error: error instanceof Error ? error.message : "Erreur inconnue",
      });
    }
  }
}

export default AuthController;
