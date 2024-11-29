import { UserRepository } from "@/Applications/Ports/spi/UserRepository";
import { User } from "../entities/User";
import { Reward } from "../entities/Reward";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.getUserById(id);
  }
  async saveUser(user: User): Promise<void> {
    return await this.userRepository.saveUser(user);
  }
  async getRewardsByUserId(userId: string): Promise<Reward[]> {
    return await this.userRepository.getRewardsByUserId(userId);
  }
}
