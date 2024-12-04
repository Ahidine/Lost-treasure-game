import { Reward } from "@/Domain/entities/Reward";
import { User } from "@/Domain/entities/User";
import { UserService } from "@/Domain/services/UserService";

export class AddRewardToUser {
  constructor(private userService: UserService) {}

  async execute(userId: string, reward: Reward): Promise<User> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const userUpdated = await this.userService.addRewardToUser(userId, reward);
    return userUpdated;
  }
}
