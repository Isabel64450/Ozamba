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


export interface LoginUserData {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: number;
    userName: string;
    email: string;
    role: string;
  };
}
