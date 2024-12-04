import {
  AuthRepository,
  AuthResponse,
} from "../../../../Applications/Ports/spi/AuthRepository";
import { AuthService } from "../../../../Domain/services/AuthService";
import { AuthController } from "./AuthController";

jest.mock("../../../../Domain/services/AuthService");

describe("AuthController", () => {
  let authController: AuthController;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockAuthRepository: jest.Mocked<AuthRepository>;

  const mockUser = {
    id: "user123",
    name: "John Doe",
    email: "john@example.com",
  };

  const mockToken = "sampleToken123";

  const mockAuthResponse: AuthResponse = {
    user: mockUser,
    token: mockToken,
  };

  beforeEach(() => {
    mockAuthService = new AuthService(
      mockAuthRepository
    ) as jest.Mocked<AuthService>;
    authController = new AuthController(mockAuthService);
  });

  it("should register a user and return an AuthResponse", async () => {
    (mockAuthService.registerUser as jest.Mock).mockResolvedValueOnce({
      user: mockUser,
      token: mockToken,
    });

    const result = await authController.register(
      "John Doe",
      "john@example.com",
      "password123"
    );

    expect(result).toEqual(mockAuthResponse);
    expect(mockAuthService.registerUser).toHaveBeenCalledWith(
      "John Doe",
      "john@example.com",
      "password123"
    );
  });

  it("should throw an error when registration fails", async () => {
    (mockAuthService.registerUser as jest.Mock).mockRejectedValueOnce(
      new Error("Registration failed")
    );

    await expect(
      authController.register("John Doe", "john@example.com", "password123")
    ).rejects.toThrow("Registration failed");
  });

  it("should login a user and return an AuthResponse", async () => {
    (mockAuthService.loginUser as jest.Mock).mockResolvedValueOnce({
      user: mockUser,
      token: mockToken,
    });

    const result = await authController.login(
      "john@example.com",
      "password123"
    );

    expect(result).toEqual(mockAuthResponse);
    expect(mockAuthService.loginUser).toHaveBeenCalledWith(
      "john@example.com",
      "password123"
    );
  });

  it("should throw an error when login fails", async () => {
    (mockAuthService.loginUser as jest.Mock).mockRejectedValueOnce(
      new Error("Login failed")
    );

    await expect(
      authController.login("john@example.com", "password123")
    ).rejects.toThrow("Login failed");
  });

  it("should logout a user successfully", async () => {
    (mockAuthService.logoutUser as jest.Mock).mockResolvedValueOnce(undefined);

    await authController.logout();

    expect(mockAuthService.logoutUser).toHaveBeenCalled();
  });

  it("should throw an error when logout fails", async () => {
    (mockAuthService.logoutUser as jest.Mock).mockRejectedValueOnce(
      new Error("Logout failed")
    );

    await expect(authController.logout()).rejects.toThrow("Logout failed");
  });
});
