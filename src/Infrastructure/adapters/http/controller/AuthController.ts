import { AuthApi } from "@/Applications/Ports/api/AuthApi";
import { AuthService } from "@/Domain/services/AuthService";
import { AuthResponse } from "@/Applications/Ports/spi/AuthRepository";

export class AuthController implements AuthApi {
  constructor(readonly authService: AuthService) {}
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const { user, token } = await this.authService.registerUser(
        name,
        email,
        password
      );
      return { user, token };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
  async logout(): Promise<void> {
    try {
      return await this.authService.logoutUser();
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const { user, token } = await this.authService.loginUser(email, password);
      return { user, token };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
}
