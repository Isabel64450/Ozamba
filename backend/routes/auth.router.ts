import { Router, type Request, type Response } from "express";

interface AuthController {
  registerUser(req: Request, res: Response): Promise<void>;
}

export function authRouter(authController: AuthController) {
  const router = Router();

  router.post(
    "/register",
    (req: Request, res: Response) => {
      authController.registerUser(req, res);
    }
  );

  return router;
}