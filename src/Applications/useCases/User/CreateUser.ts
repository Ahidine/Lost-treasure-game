import { UserRepository } from "@/Applications/Ports/spi/UserRepository";
import { User } from "@/Domain/entities/User";


export type UserInputs = {
    name: string;
    email: string;
}

export class CreateUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(input: UserInputs): Promise<User> {
    if (!input.name || !input.email) {
      throw new Error("Username and email are required.");
    }

    const existingUser = await this.userRepository.getUserByEmail(input.email);
    if (existingUser) {
      throw new Error("A user with this email already exists.");
    }

    const newUser = new User(this.generateId(), input.name, input.email, []);

    await this.userRepository.saveUser(newUser);

    return newUser;
  }

  private generateId(): string {
    return `user_${Date.now()}`;
  }
}
