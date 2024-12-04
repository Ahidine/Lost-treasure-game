import { UserService } from "./UserService";
import { UserRepository } from "../../Applications/Ports/spi/UserRepository";
import { User } from "../entities/User";
import { Reward } from "../../Domain/entities/Reward";

describe("UserService", () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;
  const mockUser: User = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    treasures: [],
  };

  beforeEach(() => {
    mockUserRepository = {
      getUsers: jest.fn(),
      getUserById: jest.fn(),
      getRewardsByUserId: jest.fn(),
      addRewardToUser: jest.fn(),
      getUserByEmail: jest.fn(),
      updateUser: jest.fn(),
    };

    userService = new UserService(mockUserRepository);
  });

  describe("getUsers", () => {
    it("should return a list of users", async () => {
      const mockUsers: User[] = [
        { id: "1", name: "John Doe", email: "john@example.com", treasures: [] },
        { id: "2", name: "Jane Doe", email: "jane@example.com", treasures: [] },
      ];
      mockUserRepository.getUsers.mockResolvedValue(mockUsers);

      const users = await userService.getUsers();
      expect(mockUserRepository.getUsers).toHaveBeenCalledTimes(1);
      expect(users).toEqual(mockUsers);
    });
  });

  describe("getUserById", () => {
    it("should return a user by id", async () => {
      mockUserRepository.getUserById.mockResolvedValue(mockUser);
      const user = await userService.getUserById("1");
      expect(mockUserRepository.getUserById).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.getUserById).toHaveBeenCalledWith("1");
      expect(user).toEqual(mockUser);
    });
  });

  describe("getRewardsByUserId", () => {
    it("should return rewards for a user", async () => {
      const mockRewards: Reward[] = [
        {
          id: "1",
          name: "Gold Medal",
          date: "2021-09-01",
          attempts: 1,
        },
      ];
      mockUserRepository.getRewardsByUserId.mockResolvedValue(mockRewards);
      const rewards = await userService.getRewardsByUserId("1");
      expect(mockUserRepository.getRewardsByUserId).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.getRewardsByUserId).toHaveBeenCalledWith("1");
      expect(rewards).toEqual(mockRewards);
    });
  });

  describe("addRewardToUser", () => {
    it("should add a reward to a user", async () => {
      const reward: Reward = {
        id: "3",
        name: "Gold Medal 2",
        date: "2021-09-01",
        attempts: 1,
      };

      mockUserRepository.addRewardToUser.mockResolvedValue(mockUser);
      const user = await userService.addRewardToUser("1", reward);
      expect(mockUserRepository.addRewardToUser).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.addRewardToUser).toHaveBeenCalledWith(
        "1",
        reward
      );
      expect(user).toEqual(mockUser);
    });
  });

  describe("getUserByEmail", () => {
    it("should return a user by email", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(mockUser);
      const user = await userService.getUserByEmail("john@example.com");
      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
        "john@example.com"
      );
      expect(user).toEqual(mockUser);
    });
  });
});
