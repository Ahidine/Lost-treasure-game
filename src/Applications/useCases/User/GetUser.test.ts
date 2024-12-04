import { User } from "../../../Domain/entities/User";
import { UserService } from "../../../Domain/services/UserService";
import { UserRepository } from "../../Ports/spi/UserRepository";
import { GetUser } from "./GetUser";

jest.mock("../../../Domain/services/UserService");

describe("GetUser", () => {
  let getUser: GetUser;
  let mockUserService: UserService;
  let mockUserRepository: UserRepository;
  const userId = "user123";
  const user: User = {
    id: userId,
    name: "John Doe",
    email: "john.doe@example.com",
    treasures: [],
  };

  beforeEach(() => {
    mockUserService = new UserService(mockUserRepository);
    getUser = new GetUser(mockUserService);
  });

  it("should return the user if user is found", async () => {
    (mockUserService.getUserById as jest.Mock).mockResolvedValueOnce(user);

    const result = await getUser.execute(userId);

    expect(mockUserService.getUserById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(user);
  });

  it("should throw an error if user is not found", async () => {
    (mockUserService.getUserById as jest.Mock).mockResolvedValueOnce(null);

    await expect(getUser.execute(userId)).rejects.toThrow("User not found");
  });
});
