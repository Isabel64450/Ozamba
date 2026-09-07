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
      throw new Error("User already exists.");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords must match");
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
  subject: 'Verify your Ozamba account',
  html: `<div style=" font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; color: #333333; background-color: #ffffff; "> <div style="text-align: center; margin-bottom: 30px;"> <h1 style=" color: #2F4798; margin: 0; font-size: 28px; "> Welcome to Ozamba </h1> </div> <p style="font-size: 16px; line-height: 1.6;"> Hello <strong>${userName}</strong>, </p> <p style="font-size: 16px; line-height: 1.6;">Thank you for creating your Ozamba account. To complete your registration and secure your account, please confirm your email address by clicking the button below.  </p> <div style="text-align: center; margin: 35px 0;"> <a href="${verificationUrl}" style=" display: inline-block; padding: 14px 28px; background-color: #2F4798; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; " > Verify my email address </a> </div> <p style="font-size: 14px; line-height: 1.6; color: #666666;"> If the button doesn't work, you can also copy and paste the following link into your browser: </p> <p style=" font-size: 13px; word-break: break-all; color: #2F4798; "> ${verificationUrl} </p> <p style=" margin-top: 30px; font-size: 14px; line-height: 1.6; color: #666666; "> For your security, if you did not create this account, you can simply ignore this email. </p> <hr style=" border: none; border-top: 1px solid #eeeeee; margin: 35px 0 20px; "> <p style=" text-align: center; font-size: 12px; color: #999999; "> This email was sent automatically by Ozamba. Please do not reply to this message. </p> </div>`

})

}
catch(emailError)
{console.error('Error sending verification email:', emailError);}
    

    return {
      success: true,
      message:
        "Account created successfully. Please check your email.",
    };
  }


 async verifyEmail(token: string) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
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
      message: "Login successful",
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
