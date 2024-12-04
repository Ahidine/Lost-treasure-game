import { User } from "@/Domain/entities/User";
import { UserService } from "@/Domain/services/UserService";

export class GetUser {
  constructor(private userService: UserService) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
