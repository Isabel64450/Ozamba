import { Router, type Request, type Response } from "express";
import { requireRole } from "../middlewares/auth.middleware.js";

interface AthletesQuery {
  gender?: string;
  category?: string;
}

interface TalentParams {
  id: string;
}

interface TalentController {
  getTalents(
    req: Request<{}, {}, {}, AthletesQuery>,
    res: Response
  ): Promise<void>;
  getTalentById(req: Request<TalentParams>, res: Response): Promise<void>;
  createTalent(req: Request<{}, {}, Record<string, unknown>>, res: Response): Promise<void>;
}

export function talentRouter(talentController: TalentController) {
  const router = Router();

  router.get("/",(req: Request<{}, {}, {}, AthletesQuery>, res: Response) => {talentController.getTalents(req, res);});
  // Création réservée aux rôles qui gèrent les athlètes (user stories 26 et 39)
  router.post("/", requireRole("Argus", "Manager"), (req: Request<{}, {}, Record<string, unknown>>, res: Response) => {talentController.createTalent(req, res);});
  router.get("/:id", (req: Request<TalentParams>, res: Response) => {talentController.getTalentById(req, res);});

  return router;
}
