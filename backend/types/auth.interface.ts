export interface RegisterUserData {
  userName: string;
  lastName: string;
  name: string;
  email: string;

  password: string;
  confirmPassword: string;

  birthDate: string | null;
  address:string;
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