import type { RowDataPacket } from "mysql2/promise";


export  interface User extends RowDataPacket{
  id: number;

  userName: string;
  lastName: string;
  name: string;
  email: string;

  birthDate: Date | null;
  phoneNumber: string | null;

  facebook: string | null;
  twitter: string | null;
  tiktok: string | null;

  job: string | null;
  category: string | null;

  password: string;

  isVerified: boolean;

  resetPasswordToken: string | null;
  resetPasswordExpire: Date | null;

  createdAt: Date;
  updatedAt: Date;

  role: string;
}

export interface NewUser {
  userName: string;
  lastName: string;
  name: string;
  email: string;

  password: string;

  birthDate: string | null;
  phoneNumber: string | null;

  facebook: string | null;
  twitter: string | null;
  tiktok: string | null;

  job: string | null;
  category: string | null;
}
