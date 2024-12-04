import { User } from "../../../Domain/entities/User";
import { UserService } from "../../../Domain/services/UserService";
import { UserRepository } from "../../Ports/spi/UserRepository";
import { GetUsers } from "./GetUsers";

jest.mock("../../../Domain/services/UserService");

describe("GetUser", () => {
  let getUsers: GetUsers;
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
    getUsers = new GetUsers(mockUserService);
  });

  it("should return users", async () => {
    (mockUserService.getUsers as jest.Mock).mockResolvedValueOnce([user]);

    const result = await getUsers.execute();

    expect(mockUserService.getUsers).toHaveBeenCalled();
    expect(result).toEqual([user]);
  });
});
