interface TalentRepository {
  getTalents(filters: {
    gender?: string;
    category?: string;
  }): Promise<unknown[]>;
  getTalentById(id: number): Promise<unknown | null>;
  createTalent(input: CreateTalentInput): Promise<number>;
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

interface TalentFilters {
  gender?: string;
  category?: string;
}

class TalentService {
  private talentRepository: TalentRepository;

  constructor(talentRepository: TalentRepository) {
    this.talentRepository = talentRepository;
  }

  async getTalents(filters: TalentFilters): Promise<unknown[]> {
    return await this.talentRepository.getTalents(filters);
  }

  async getTalentById(id: number): Promise<unknown | null> {
    return await this.talentRepository.getTalentById(id);
  }

  async createTalent(input: CreateTalentInput): Promise<number> {
    return await this.talentRepository.createTalent(input);
  }
}

export default TalentService;
