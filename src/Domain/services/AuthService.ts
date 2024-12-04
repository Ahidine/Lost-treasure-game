import {
  AuthRepository,
  AuthResponse,
} from "@/Applications/Ports/spi/AuthRepository";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}
  async registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const { user, token } = await this.authRepository.registerUser(
        name,
        email,
        password
      );
      return { user, token };
    } catch (e) {
      throw new Error(`Register User Authentication : ${(e as Error).message}`);
    }
  }
  async loginUser(email: string, password: string): Promise<AuthResponse> {
    try {
      const { user, token } = await this.authRepository.loginUser(
        email,
        password
      );
      return { user, token };
    } catch (e) {
      throw new Error(`User Authentication : ${(e as Error).message}`);
    }
  }
  async logoutUser(): Promise<void> {
    try {
      await this.authRepository.logoutUser();
    } catch (e) {
      throw new Error(`User Logout ${(e as Error).message}`);
    }
  }
}
