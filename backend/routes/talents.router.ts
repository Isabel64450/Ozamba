import { Router, type Request, type Response } from "express";

interface AthletesQuery {
  gender?: string;
  category?: string;
}

interface TalentController {
  getTalents(
    req: Request<{}, {}, {}, AthletesQuery>,
    res: Response
  ): Promise<void>;
}

export function talentRouter(talentController: TalentController) {
  const router = Router();

  router.get("/",(req: Request<{}, {}, {}, AthletesQuery>, res: Response) => {talentController.getTalents(req, res);});

  return router;
}
