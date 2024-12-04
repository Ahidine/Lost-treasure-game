import { Reward } from "./Reward";
describe("Reward", () => {
  it("should create a new Reward instance", () => {
    const reward = new Reward("1", "Gold Coin", "2022-01-01", 3);

    expect(reward).toBeDefined();
    expect(reward.id).toBe("1");
    expect(reward.name).toBe("Gold Coin");
    expect(reward.date).toBe("2022-01-01");
    expect(reward.attempts).toBe(3);
  });
});
