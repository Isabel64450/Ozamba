import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Contenu du token créé au login (auth.service.ts)
interface TokenPayload {
  id: number;
  email: string;
  role: string;
}

// Laisse passer uniquement un utilisateur connecté ayant un des rôles autorisés
export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Header attendu : "Authorization: Bearer <token>"
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500).json({ error: "JWT_SECRET is not defined" });
      return;
    }

    try {
      const payload = jwt.verify(token, secret) as TokenPayload;

      if (!allowedRoles.includes(payload.role)) {
        res.status(403).json({ error: "You are not allowed to do this" });
        return;
      }

      next();
    } catch {
      // Token expiré ou modifié
      res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}
