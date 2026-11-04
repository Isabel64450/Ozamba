import type { Request, Response } from "express";

interface AthletesQuery {
  gender?: string | undefined;
  category?: string | undefined;
}

interface TalentParams {
  id: string;
}

interface CreateTalentInput {
  gender: string;
  category: string;
  firstName: string;
  lastName: string;
  position?: string | null;
  number?: string | null;
  birthDate?: string | null;
  height?: number | null;
  weight?: number | null;
  photo?: string | null;
  clubId?: number | null;
}

// Sports autorisés par section (mêmes valeurs que frontend/src/config/sports.ts)
const SPORTS_BY_GENDER: Record<string, string[]> = {
  men: ["basketball", "football", "volleyball"],
  women: ["basketball", "football", "volleyball", "flag", "hockey"],
};

// Texte non vide après trim, sinon null
function cleanText(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

// Entier positif ou null ; undefined si la valeur est fournie mais invalide
function cleanPositiveInt(value: unknown): number | null | undefined {
  if (value === undefined || value === null || value === "") return null;
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : undefined;
}

// Vérifie le corps de la requête : renvoie les données propres ou un message d'erreur
function validateCreateTalent(body: Record<string, unknown>): CreateTalentInput | string {
  const gender = cleanText(body.gender);
  const category = cleanText(body.category);
  const firstName = cleanText(body.firstName);
  const lastName = cleanText(body.lastName);

  if (!gender || !SPORTS_BY_GENDER[gender]) return "gender must be men or women";

  const allowedSports = SPORTS_BY_GENDER[gender];
  if (!category || !allowedSports.includes(category)) {
    return `category for ${gender} must be one of: ${allowedSports.join(", ")}`;
  }
  if (!firstName || !lastName) return "firstName and lastName are required";

  const birthDate = cleanText(body.birthDate);
  if (birthDate && !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) return "birthDate must be YYYY-MM-DD";

  const height = cleanPositiveInt(body.height);
  const weight = cleanPositiveInt(body.weight);
  const clubId = cleanPositiveInt(body.clubId);
  if (height === undefined) return "height must be a whole number of cm";
  if (weight === undefined) return "weight must be a whole number of kg";
  if (clubId === undefined) return "clubId must be a positive integer";

  return {
    gender,
    category,
    firstName,
    lastName,
    position: cleanText(body.position),
    number: cleanText(String(body.number ?? "")),
    birthDate,
    height,
    weight,
    photo: cleanText(body.photo),
    clubId,
  };
}

interface TalentService {
  getTalents(filters: AthletesQuery): Promise<unknown[]>;
  getTalentById(id: number): Promise<unknown | null>;
  createTalent(input: CreateTalentInput): Promise<number>;
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

  async createTalent(req: Request<{}, {}, Record<string, unknown>>, res: Response): Promise<void> {
    try {
      const result = validateCreateTalent(req.body ?? {});

      // Une chaîne = message d'erreur de validation
      if (typeof result === "string") {
        res.status(400).json({ error: result });
        return;
      }

      const id = await this.talentService.createTalent(result);

      res.status(201).json({ id });
    } catch (error: unknown) {
      console.error("Error creating talent:", error);

      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export default TalentController;
