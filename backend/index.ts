import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { authRouter } from "./routes/auth.router.js";
import { initDependencies } from "./dependencies/initDependencies.js";
import getPool from "./config/base.pool.js";
import type { Request, Response } from "express";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});


const app = express();
const pool = getPool();
app.use(cors({
  origin:`${process.env.CLIENT_FRONT}`, 
  credentials: true,            
}))
app.use(express.json());

const {authController}=initDependencies(pool)
app.use("/auth", authRouter(authController))

// POST /auth/forgot-password
app.post('/auth/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body

  if (!email) {
    res.status(400).json({ message: 'Email requis.' })
    return
  }

  // TODO: vérifier que l'email existe en base de données
  // TODO: générer un token (ex: crypto.randomUUID())
  // TODO: sauvegarder le token en base avec une expiration
  // TODO: envoyer l'email avec le lien

  console.log(`[DEV] Lien de reset pour ${email}: http://localhost:5173/reset-password?token=FAKE_TOKEN`)
  res.json({ message: 'Si cet email existe, un lien a été envoyé.' })
})

// POST /auth/reset-password
app.post('/auth/reset-password', async (req: Request, res: Response) => {
  const { token, password } = req.body

  if (!token || !password) {
    res.status(400).json({ message: 'Token et mot de passe requis.' })
    return
  }

  // TODO: vérifier que le token existe en base et n'est pas expiré
  // TODO: hasher le nouveau mot de passe (ex: bcrypt)
  // TODO: mettre à jour le mot de passe de l'utilisateur
  // TODO: supprimer le token utilisé

  res.json({ message: 'Mot de passe réinitialisé avec succès.' })
})

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
   
  console.log(`Server running on http://localhost:${PORT}`);
});
