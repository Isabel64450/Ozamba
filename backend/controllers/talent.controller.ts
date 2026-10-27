import type { Request, Response } from "express";

interface AthletesQuery {
  gender?: string | undefined;
  category?: string | undefined;
}

interface TalentParams {
  id: string;
}

interface TalentService {
  getTalents(filters: AthletesQuery): Promise<unknown[]>;
  getTalentById(id: number): Promise<unknown | null>;
}

class TalentController {
  private talentService: TalentService;

  constructor(talentService: TalentService) {
    this.talentService = talentService;
  }

  async getTalents(req: Request<{}, {}, {}, AthletesQuery>, res: Response,): Promise<void> {
    try {
      const { gender, category } = req.query;

      const talents = await this.talentService.getTalents({
        gender,
        category,
      });

      res.status(200).json(talents);
    } catch (error: unknown) {
      console.error("Error getting talents:", error);

      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getTalentById(req: Request<TalentParams>, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      // L'id vient de l'URL : on refuse tout ce qui n'est pas un entier positif
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "Invalid talent id" });
        return;
      }

      const talent = await this.talentService.getTalentById(id);

      if (!talent) {
        res.status(404).json({ error: "Talent not found" });
        return;
      }

      res.status(200).json(talent);
    } catch (error: unknown) {
      console.error("Error getting talent:", error);

      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export default TalentController;
