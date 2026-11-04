interface TalentRepository {
  getTalents(filters: {
    gender?: string;
    category?: string;
  }): Promise<unknown[]>;
  getTalentById(id: number): Promise<unknown | null>;
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
}

export default TalentService;
