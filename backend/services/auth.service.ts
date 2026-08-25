import argon2 from "argon2";
import jwt from "jsonwebtoken";


interface RegisterUserData {
  userName: string;
  userLastName: string;
  userEmail: string;
  password: string;
  confirmPassword: string;
  adress_delivery:number;
}

interface AddressData {
  number: string;
  street: string;
  complement?: string;
  city: string;
  postalCode: string;
  type: "main" | "delivery";
}

interface NewUser {
  userName: string;
  userLastName: string;
  userEmail: string;
  password: string;
  adress_delivery: number;
}

interface AuthRepository {
  getUserByEmail(userEmail: string): Promise<unknown>;
  createUser(user: NewUser): Promise<number>;
  getUserById(userId: number): Promise<unknown>;
  markUserAsVerified(userId: number): Promise<unknown>;
}



interface OrderService {
  // Ajoute ici les méthodes de ton OrderService
}

interface RegisterUserResponse {
  success: boolean;
  message: string;
}

class AuthService {
  private authRepository: AuthRepository;
 
  

  constructor(
    authRepository: AuthRepository,
    
    orderService: OrderService
  ) {
    this.authRepository = authRepository;
   
    
  }

  async registerUser(
    userData: RegisterUserData
  ): Promise<RegisterUserResponse> {
    const {
      userName,
      userLastName,
      userEmail,
      password,
      confirmPassword,
      adress_delivery,
    } = userData;

    const existingUser =
      await this.authRepository.getUserByEmail(userEmail);

    if (existingUser) {
      throw new Error("L'utilisateur existe déjà");
    }

    if (password !== confirmPassword) {
      throw new Error("Les mots de passe doivent être identiques");
    }

    const hashedPassword = await argon2.hash(password);

    




    const newUser: NewUser = {
      userName,
      userLastName,
      userEmail,
      password: hashedPassword,
      adress_delivery,
    };

    const userId =
      await this.authRepository.createUser(newUser);

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET n'est pas défini");
    }

    const verificationToken = jwt.sign(
      {
        id: userId,
      },
      jwtSecret,
      {
        expiresIn: "1d",
      }
    );

    const clientFront = process.env.CLIENT_FRONT;

    if (!clientFront) {
      throw new Error("CLIENT_FRONT n'est pas défini");
    }

    const verificationUrl =
      `${clientFront}/verify-email/${verificationToken}`;

    

    return {
      success: true,
      message:
        "Utilisateur créé avec succès. Vérifiez votre email.",
    };
  }

  async findUserById(userId: number): Promise<unknown> {
    return await this.authRepository.getUserById(userId);
  }

  async markUserAsVerified(userId: number): Promise<unknown> {
    return await this.authRepository.markUserAsVerified(userId);
  }
}

export default AuthService;
