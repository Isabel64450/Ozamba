import type { Request, Response } from "express";

interface AthletesQuery {
  gender?: string | undefined;
  category?: string | undefined;
}

interface TalentService {
  getTalents(filters: AthletesQuery): Promise<unknown[]>;
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
}

export default TalentController;
