import { UserRepository } from "@/Applications/Ports/spi/UserRepository";
import { User } from "@/Domain/entities/User";
import { Reward } from "@/Domain/entities/Reward";
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async getUsers(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }
  async getUserById(id: string): Promise<User> {
    return await this.userRepository.getUserById(id);
  }
  async getRewardsByUserId(userId: string): Promise<Reward[]> {
    return await this.userRepository.getRewardsByUserId(userId);
  }
  async addRewardToUser(userId: string, reward: Reward): Promise<User> {
    return await this.userRepository.addRewardToUser(userId, reward);
  }
  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.getUserByEmail(email);
  }
}
