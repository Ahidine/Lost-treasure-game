import { Reward } from "../../../Domain/entities/Reward";
import { UserService } from "../../../Domain/services/UserService";
import { UserRepository } from "../../Ports/spi/UserRepository";
import { GetUserRewards } from "./GetUserRewards";
jest.mock("../../../Domain/services/UserService");

describe("GetUserRewards", () => {
  let getUserRewards: GetUserRewards;
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
    getUserRewards = new GetUserRewards(mockUserService);
  });

  it("should return user rewards if user is found", async () => {
    (mockUserService.getUserById as jest.Mock).mockResolvedValueOnce({
      id: userId,
      name: "John Doe",
      rewards: [reward],
    });
    (mockUserService.getRewardsByUserId as jest.Mock).mockResolvedValueOnce([
      reward,
    ]);

    const result = await getUserRewards.execute(userId);

    expect(mockUserService.getUserById).toHaveBeenCalledWith(userId);
    expect(mockUserService.getRewardsByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual([reward]);
  });

  it("should throw an error if user is not found", async () => {
    (mockUserService.getUserById as jest.Mock).mockResolvedValueOnce(null);

    await expect(getUserRewards.execute(userId)).rejects.toThrow(
      "User not found"
    );
  });

  it("should return empty array if the user has no rewards", async () => {
    (mockUserService.getUserById as jest.Mock).mockResolvedValueOnce({
      id: userId,
      name: "John Doe",
      rewards: [],
    });
    (mockUserService.getRewardsByUserId as jest.Mock).mockResolvedValueOnce([]);

    const result = await getUserRewards.execute(userId);

    expect(result).toEqual([]);
  });

  it("should throw an error if rewards retrieval fails", async () => {
    (mockUserService.getUserById as jest.Mock).mockResolvedValueOnce({
      id: userId,
      name: "John Doe",
      rewards: [reward],
    });
    (mockUserService.getRewardsByUserId as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch rewards")
    );

    await expect(getUserRewards.execute(userId)).rejects.toThrow(
      "Failed to fetch rewards"
    );
  });
});
