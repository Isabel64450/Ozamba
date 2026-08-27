import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response } from "express";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (res: Response) => {
  res.json({ message: "API is running" });
});

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
