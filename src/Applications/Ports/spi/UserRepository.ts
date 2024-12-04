import { Reward } from "@/Domain/entities/Reward";
import { User } from "@/Domain/entities/User";

export interface UserRepository {
  addRewardToUser(userId: string, reward: Reward): Promise<User>;
  updateUser(user: User): void | Promise<User>;
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getUsers(): Promise<User[]>;
  getRewardsByUserId(userId: string): Promise<Reward[]>;
}
