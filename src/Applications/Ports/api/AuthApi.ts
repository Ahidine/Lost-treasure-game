import { AuthResponse } from "../spi/AuthRepository";

export interface AuthApi {
  register(
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse>;
  login(email: string, password: string): Promise<AuthResponse>;
  logout(): Promise<void>;
}
