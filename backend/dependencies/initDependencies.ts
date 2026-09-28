import type {Pool} from 'mysql2/promise'

import AuthController from "../controllers/auth.controller.js";
import AuthRepository from "../repositories/auth.repository.js";
import AuthService from "../services/auth.service.js";

import TalentRepository from "../repositories/talent.repository.js";
import TalentService from "../services/talent.service.js";
import TalentController from "../controllers/talent.controller.js";



export function initDependencies(pool:Pool){
   const authRepository = new AuthRepository(pool);
  const authService = new AuthService(authRepository);
  const authController = new AuthController(authService);

   const talentRepository = new TalentRepository(pool);
  const talentService = new TalentService(talentRepository);
  const talentController = new TalentController(talentService);
    return{
        authController,
        talentController
    }
}