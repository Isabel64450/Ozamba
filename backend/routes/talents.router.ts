import { Router, type Request, type Response } from "express";

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
}

export function talentRouter(talentController: TalentController) {
  const router = Router();

  router.get("/",(req: Request<{}, {}, {}, AthletesQuery>, res: Response) => {talentController.getTalents(req, res);});
  router.get("/:id", (req: Request<TalentParams>, res: Response) => {talentController.getTalentById(req, res);});

  return router;
}
