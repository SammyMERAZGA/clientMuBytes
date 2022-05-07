import { Role } from "./Role";

export type Customer = {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  role: Role;
};