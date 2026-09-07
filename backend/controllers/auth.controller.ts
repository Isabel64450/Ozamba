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
          error: "All required fields must be filled in.",
        });
        return;
      }

      // Vérification du mot de passe
      if (password !== confirmPassword) {
        res.status(400).json({
          message: "The passwords must match.",
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
          "Account created successfully. Please check your email.",
      });
    } catch (error: unknown) {
      console.error("Erreur dans registerUser :", error);

      res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "Unknown error.",
      });
    }
  }


 async verifyEmail(req: Request<VerifyEmailParams>, res: Response): Promise<Response> {

    try {
      const { token } = req.params;

      if (!token) {
        return res.status(400).json({
          message: "Verification token is missing.",
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
        message: "Your account has been successfully verified.",
        alreadyVerified: false,
      });

    } catch (error) {

      if (error instanceof Error) {

        if (error.message === "TOKEN_EXPIRED") {
          return res.status(400).json({
            message: "The verification link has expired.",
          });
        }

        if (error.message === "INVALID_TOKEN") {
          return res.status(400).json({
            message: "The verification link is invalid.",
          });
        }

        if (error.message === "USER_NOT_FOUND") {
          return res.status(404).json({
            message: "User not found.",
          });
        }
      }

      console.error(
        "Error verifying email:",
        error
      );

      return res.status(500).json({
        message: "Error verifying email:",
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
          message: "Email and password are required",
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
            message: "Invalid email or password",
          });
        }

        if (error.message === "EMAIL_NOT_VERIFIED") {
          return res.status(403).json({
            message: "“Please verify your email address before signing in.",
          });
        }
      }

      console.error(
        "Error signing in:",
        error
      );

      return res.status(500).json({
        message: "Error signing in:",
      });
    }
  }
















  
}

export default AuthController;