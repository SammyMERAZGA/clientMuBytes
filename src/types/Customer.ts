import { Role } from "./Role";

export type Customer = {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  role_id: number;
  role: Role;
};
