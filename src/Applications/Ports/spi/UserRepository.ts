import { Reward } from "@/Domain/entities/Reward";
import { User } from "@/Domain/entities/User";

export interface UserRepository {
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  saveUser(user: User): Promise<void>;
  getRewardsByUserId(userId: string): Promise<Reward[]>;
}
