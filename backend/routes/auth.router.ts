import { Router, type Request, type Response } from "express";

interface VerifyEmailParams {token: string;}


interface AuthController {
  registerUser(req: Request, res: Response): Promise<void>;
  verifyEmail(req: Request<VerifyEmailParams>, res: Response): Promise<Response>;
  loginUser(req: Request, res:Response):Promise<Response>;
}

export function authRouter(authController: AuthController) {
  const router = Router();

  router.post("/register", (req: Request, res: Response) => {authController.registerUser(req, res);});
  router.get("/verify/:token", (req: Request<VerifyEmailParams>, res: Response) => {authController.verifyEmail(req, res);});
  router.post('/login',(req: Request,res:Response)=>{authController.loginUser(req,res)})

  return router;
}