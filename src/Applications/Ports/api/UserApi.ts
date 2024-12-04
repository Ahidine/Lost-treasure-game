import { Reward } from "@/Domain/entities/Reward";
import { User } from "@/Domain/entities/User";

export type UserInputs = {
  name: string;
  email: string;
};
export interface UserApi {
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  getRewardsByUserId(userId: string): Promise<Reward[]>;
  addRewardToUser(userId: string, reward: Reward): Promise<Reward[]>;
}
