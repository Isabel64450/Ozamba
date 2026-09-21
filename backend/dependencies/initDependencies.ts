import type {Pool} from 'mysql2/promise'

import AuthController from "../controllers/auth.controller.js";
import AuthRepository from "../repositories/auth.repository.js";
import AuthService from "../services/auth.service.js";
export function initDependencies(pool:Pool){
   const authRepository = new AuthRepository(pool);
  const authService = new AuthService(authRepository);
  const authController = new AuthController(authService);
    return{
        authController
    }
}