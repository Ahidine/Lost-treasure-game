import { UserRepository } from "@/Applications/Ports/spi/UserRepository";
import { Reward } from "@/Domain/entities/Reward";

export class GetUserRewards {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<Reward[]> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const userRewards = await this.userRepository.getRewardsByUserId(userId);
    return userRewards;
  }
}
