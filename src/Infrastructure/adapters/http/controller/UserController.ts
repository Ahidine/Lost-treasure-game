import { UserApi, UserInputs } from "@/Applications/Ports/api/UserApi";
import { Reward } from "@/Domain/entities/Reward";
import { User } from "@/Domain/entities/User";
import { AddRewardToUser } from "@/Applications/useCases/User/AddRewardToUser";
import { GetUserRewards } from "@/Applications/useCases/User/GetUserRewards";
import { GetUsers } from "@/Applications/useCases/User/GetUsers";
import { GetUser } from "@/Applications/useCases/User/GetUser";
import { UserService } from "@/Domain/services/UserService";

export class UserController implements UserApi {
  constructor(readonly userService: UserService) {}
  async addRewardToUser(userId: string, reward: Reward): Promise<Reward[]> {
    try {
      const addRewardToUserUseCase = new AddRewardToUser(this.userService);
      const user = await addRewardToUserUseCase.execute(userId, reward);
      return user.treasures;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
  async getUsers(): Promise<User[]> {
    try {
      const getUsersUseCase = new GetUsers(this.userService);
      return await getUsersUseCase.execute();
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
  async getUserById(id: string): Promise<User> {
    try {
      const getUserUseCase = new GetUser(this.userService);
      return await getUserUseCase.execute(id);
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
  async getRewardsByUserId(userId: string): Promise<Reward[]> {
    try {
      const getUserRewardUseCase = new GetUserRewards(this.userService);
      const userRewards = await getUserRewardUseCase.execute(userId);
      return userRewards;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
}
