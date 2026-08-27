import type { RowDataPacket } from "mysql2/promise";


export  interface User extends RowDataPacket{
  id: number;
  customer_id: number;
  userName: string;
  userLastName: string;
  userEmail: string;
  password: string;
  adress_delivery: number;
  is_verified: boolean;
}

export interface NewUser {
  userName: string;
  userLastName: string;
  userEmail: string;
  password: string;
  adress_delivery: number;
}
