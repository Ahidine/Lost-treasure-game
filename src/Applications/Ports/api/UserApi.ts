import { GameSession } from "@/Domain/entities/GameSessions";
import { Reward } from "@/Domain/entities/Reward";
import { Treasure } from "@/Domain/entities/Treasure";
import { User } from "@/Domain/entities/User";

export interface UserApi {
  getUserById(id: string): Promise<User>;
  saveUser(user: User): Promise<void>;
  getRewardsByUserId(userId: string): Promise<Reward[]>;
}
