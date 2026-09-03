import argon2 from "argon2";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { NewUser, User } from "../types/user.interface.js";
import type { RegisterUserData, RegisterUserResponse,LoginUserData,LoginUserResponse } from "../types/auth.interface.js";
import sendEmail from "../tools.auth/sendEmail.js"
import type { AuthRepository } from "../types/auth.repository.interface.js";




interface VerificationTokenPayload extends JwtPayload {
  id: number;
}



class AuthService {
  private authRepository: AuthRepository;
 
  

  constructor(
    authRepository: AuthRepository,
    
   
  ) {
    this.authRepository = authRepository;
   
    
  }

  async registerUser(
    userData: RegisterUserData
  ): Promise<RegisterUserResponse> {
    const {
       userName,
      lastName,
      name,
      email,
      password,
      confirmPassword,
      birthDate,
      address,
      phoneNumber,
      facebook,
      twitter,
      tiktok,
      job,
      category,
    } = userData;

    const existingUser =
      await this.authRepository.getUserByEmail(email);

    if (existingUser) {
      throw new Error("L'utilisateur existe déjà");
    }

    if (password !== confirmPassword) {
      throw new Error("Les mots de passe doivent être identiques");
    }

   



    const newUser: NewUser = {
      userName,
      lastName,
      name,
      email,
      password,

      birthDate: birthDate ?? null,
      address,
      phoneNumber: phoneNumber ?? null,

      facebook: facebook ?? null,
      twitter: twitter ?? null,
      tiktok: tiktok ?? null,

      job: job ?? null,
      category: category ?? null,
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
    try{ 
  
await sendEmail.sendMail({
  from: process.env.GMAIL_USER,
  to: email,
  subject: 'Verification de votre compte Ozamba',
  html: `<div style=" font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; color: #333333; background-color: #ffffff; "> <div style="text-align: center; margin-bottom: 30px;"> <h1 style=" color: #2F4798; margin: 0; font-size: 28px; "> Bienvenue sur Ozamba </h1> </div> <p style="font-size: 16px; line-height: 1.6;"> Bonjour <strong>${userName}</strong>, </p> <p style="font-size: 16px; line-height: 1.6;"> Merci d’avoir créé votre compte Ozamba. Pour finaliser votre inscription et sécuriser votre compte, veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous. </p> <div style="text-align: center; margin: 35px 0;"> <a href="${verificationUrl}" style=" display: inline-block; padding: 14px 28px; background-color: #2F4798; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; " > Vérifier mon adresse e-mail </a> </div> <p style="font-size: 14px; line-height: 1.6; color: #666666;"> Si le bouton ne fonctionne pas, vous pouvez également copier et coller le lien suivant dans votre navigateur : </p> <p style=" font-size: 13px; word-break: break-all; color: #2F4798; "> ${verificationUrl} </p> <p style=" margin-top: 30px; font-size: 14px; line-height: 1.6; color: #666666; "> Pour votre sécurité, si vous n’êtes pas à l’origine de cette inscription, vous pouvez simplement ignorer cet e-mail. </p> <hr style=" border: none; border-top: 1px solid #eeeeee; margin: 35px 0 20px; "> <p style=" text-align: center; font-size: 12px; color: #999999; "> Cet e-mail a été envoyé automatiquement par Ozamba. Merci de ne pas répondre à ce message. </p> </div>`

})

}
catch(emailError)
{console.error('Erreur lors de l’envoi de l’email de vérification :', emailError);}
    

    return {
      success: true,
      message:
        "Utilisateur créé avec succès. Vérifiez votre email.",
    };
  }


 async verifyEmail(token: string) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET n'est pas configuré");
    }

    let decoded: VerificationTokenPayload;

    try {
      decoded = jwt.verify(
        token,
        secret
      ) as VerificationTokenPayload;
    } catch (error) {

      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("TOKEN_EXPIRED");
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("INVALID_TOKEN");
      }

      throw error;
    }

    if (!decoded.id) {
      throw new Error("INVALID_TOKEN");
    }

    const user = await this.authRepository.getUserById(
      decoded.id
    );

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    if (user.isVerified === true) {
      return {
        alreadyVerified: true,
      };
    }

    await this.authRepository.markUserAsVerified(
      user.id
    );

    return {
      alreadyVerified: false,
    };
  }


   async loginUser(
    loginData: LoginUserData
  ): Promise<LoginUserResponse> {

    const { email, password } = loginData;

    const user = await this.authRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const passwordIsValid = await argon2.verify(
      user.password,
      password
    );

    if (!passwordIsValid) {
      throw new Error("INVALID_CREDENTIALS");
    }

    if (!user.isVerified) {
      throw new Error("EMAIL_NOT_VERIFIED");
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET n'est pas défini");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      {
        expiresIn: "1d",
      }
    );

    return {
      success: true,
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    };
  }
















 
}

export default AuthService;
