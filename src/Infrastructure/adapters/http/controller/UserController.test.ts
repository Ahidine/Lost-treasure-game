import { UserRepository } from "../../../../Applications/Ports/spi/UserRepository";
import { AddRewardToUser } from "../../../../Applications/useCases/User/AddRewardToUser";
import { GetUser } from "../../../../Applications/useCases/User/GetUser";
import { GetUserRewards } from "../../../../Applications/useCases/User/GetUserRewards";
import { GetUsers } from "../../../../Applications/useCases/User/GetUsers";
import { Reward } from "../../../../Domain/entities/Reward";
import { User } from "../../../../Domain/entities/User";
import { UserService } from "../../../../Domain/services/UserService";
import { UserController } from "./UserController";

jest.mock("../../../../Domain/services/UserService");
jest.mock("../../../../Applications/useCases/User/AddRewardToUser");
jest.mock("../../../../Applications/useCases/User/GetUserRewards");
jest.mock("../../../../Applications/useCases/User/GetUsers");
jest.mock("../../../../Applications/useCases/User/GetUser");

describe("UserController", () => {
  let userController: UserController;
  let mockUserService: jest.Mocked<UserService>;
  let mockUserRepository: jest.Mocked<UserRepository>;

  const mockUser: User = {
    id: "user123",
    name: "John Doe",
    email: "john.doe@example.com",
    treasures: [],
  };

  const mockReward: Reward = {
    id: "reward123",
    name: "Gold Coin",
    date: "2021-09-01",
    attempts: 3,
  };

  beforeEach(() => {
    mockUserService = new UserService(
      mockUserRepository
    ) as jest.Mocked<UserService>;
    userController = new UserController(mockUserService);
  });

  it("should add a reward to a user", async () => {
    (AddRewardToUser.prototype.execute as jest.Mock).mockResolvedValueOnce({
      treasures: [mockReward],
    });
    const result = await userController.addRewardToUser("user123", mockReward);

    expect(result).toEqual([mockReward]);
    expect(AddRewardToUser.prototype.execute).toHaveBeenCalledWith(
      "user123",
      mockReward
    );
  });

  it("should get all users", async () => {
    (GetUsers.prototype.execute as jest.Mock).mockResolvedValueOnce([mockUser]);
    const result = await userController.getUsers();

    expect(result).toEqual([mockUser]);
    expect(GetUsers.prototype.execute).toHaveBeenCalled();
  });

  it("should get a user by ID", async () => {
    (GetUser.prototype.execute as jest.Mock).mockResolvedValueOnce(mockUser);

    const result = await userController.getUserById("user123");

    expect(result).toEqual(mockUser);
    expect(GetUser.prototype.execute).toHaveBeenCalledWith("user123");
  });

  it("should get rewards by user ID", async () => {
    (GetUserRewards.prototype.execute as jest.Mock).mockResolvedValueOnce([
      mockReward,
    ]);

    const result = await userController.getRewardsByUserId("user123");

    expect(result).toEqual([mockReward]);
    expect(GetUserRewards.prototype.execute).toHaveBeenCalledWith("user123");
  });

  it("should throw an error if addRewardToUser fails", async () => {
    (AddRewardToUser.prototype.execute as jest.Mock).mockRejectedValueOnce(
      new Error("User not found")
    );

    await expect(
      userController.addRewardToUser("user123", mockReward)
    ).rejects.toThrow("User not found");
  });

  it("should throw an error if getUserById fails", async () => {
    (GetUser.prototype.execute as jest.Mock).mockRejectedValueOnce(
      new Error("User not found")
    );

    await expect(userController.getUserById("user123")).rejects.toThrow(
      "User not found"
    );
  });
});
