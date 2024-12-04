import { AuthService } from "./AuthService";
import {
  AuthRepository,
  AuthResponse,
} from "../../Applications/Ports/spi/AuthRepository";
describe("AuthService", () => {
  let authService: AuthService;
  let authRepository: AuthRepository;
  let expectedResponse: AuthResponse;
  const name = "John Doe";
  const email = "john.doe@example.com";
  const password = "password123";

  beforeEach(() => {
    expectedResponse = {
      user: {
        id: "123",
        name,
        email,
        treasures: [],
      },
      token: "token test",
    };
    authRepository = {
      registerUser: jest.fn(),
      loginUser: jest.fn(),
      logoutUser: jest.fn(),
    };
    authService = new AuthService(authRepository);
  });

  it("should register a user successfully", async () => {
    (authRepository.registerUser as jest.Mock).mockResolvedValue(
      expectedResponse
    );

    const result = await authService.registerUser(name, email, password);
    expect(result).toEqual(expectedResponse);
    expect(authRepository.registerUser).toHaveBeenCalledWith(
      name,
      email,
      password
    );
  });

  it("should login a user successfully", async () => {
    (authRepository.loginUser as jest.Mock).mockResolvedValue(expectedResponse);
    const result = await authService.loginUser(email, password);

    expect(result).toEqual(expectedResponse);
    expect(authRepository.loginUser).toHaveBeenCalledWith(email, password);
  });

  it("should logout a user successfully", async () => {
    (authRepository.loginUser as jest.Mock).mockResolvedValue(undefined);
    await authService.logoutUser();
    expect(authRepository.logoutUser).toHaveBeenCalled();
  });
});
