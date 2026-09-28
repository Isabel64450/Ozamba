interface TalentRepository {
  getTalents(filters: {
    gender?: string;
    category?: string;
  }): Promise<unknown[]>;
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
}

export default TalentService;
