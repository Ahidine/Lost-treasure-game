import { User } from "@/Domain/entities/User";
export type AuthResponse = {
  user: User;
  token: string;
};
export interface AuthRepository {
  registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse>;
  loginUser(email: string, password: string): Promise<AuthResponse>;
  logoutUser(): Promise<void>;
}
