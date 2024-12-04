import { Reward } from "../../../Domain/entities/Reward";
import { UserService } from "../../../Domain/services/UserService";
import { UserRepository } from "../../Ports/spi/UserRepository";
import { AddRewardToUser } from "./AddRewardToUser";
jest.mock("../../../Domain/services/UserService");

describe("AddRewardToUser", () => {
  let addRewardToUser: AddRewardToUser;
  let mockUserService: UserService;
  let mockUserRepository: UserRepository;
  const userId = "user123";
  const reward: Reward = {
    id: "reward123",
    name: "Gold Coin",
    date: "2021-09-01",
    attempts: 3,
  };

  beforeEach(() => {
    mockUserService = new UserService(mockUserRepository);
    addRewardToUser = new AddRewardToUser(mockUserService);
  });

  it("should add a reward to the user", async () => {
    (mockUserService.getUserById as jest.Mock).mockResolvedValueOnce({
      id: userId,
      name: "John Doe",
      rewards: [],
    });
    (mockUserService.addRewardToUser as jest.Mock).mockResolvedValueOnce({
      id: userId,
      name: "John Doe",
      rewards: [reward],
    });
    const result = await addRewardToUser.execute(userId, reward);
    expect(result).toEqual({ id: userId, name: "John Doe", rewards: [reward] });
  });

  it("should throw an error if user is not found", async () => {
    (mockUserService.addRewardToUser as jest.Mock).mockRejectedValueOnce(
      new Error("User not found")
    );

    await expect(addRewardToUser.execute(userId, reward)).rejects.toThrow(
      "User not found"
    );
  });
});
