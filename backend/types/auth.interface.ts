export interface RegisterUserData {
  userName: string;
  lastName: string;
  name: string;
  email: string;

  password: string;
  confirmPassword: string;

  birthDate: string | null;
  phoneNumber: string | null;

  facebook: string | null;
  twitter: string | null;
  tiktok: string | null;

  job: string | null;
  category: string | null;
}

export interface RegisterUserResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}