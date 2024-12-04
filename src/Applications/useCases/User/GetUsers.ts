import { User } from "@/Domain/entities/User";
import { UserService } from "@/Domain/services/UserService";

export class GetUsers {
  constructor(private userService: UserService) {}

  async execute(): Promise<User[]> {
    const users = await this.userService.getUsers();
    return users;
  }
}
