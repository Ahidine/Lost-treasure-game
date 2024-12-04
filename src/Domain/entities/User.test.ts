import { User } from "../entities/User";
import { Reward } from "../entities/Reward";

describe("User", () => {
  it("should create a new user with the provided data", () => {
    const id = "123";
    const name = "John Doe";
    const email = "john.doe@example.com";
    const rewards: Reward[] = [
      new Reward("1", "Treasure 1", "2022-01-01", 3),
      new Reward("2", "Treasure 2", "2022-01-02", 2),
    ];

    const user = new User(id, name, email, rewards);

    expect(user.id).toBe(id);
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
    expect(user.treasures).toEqual(rewards);
  });
});
