import { Treasure } from "../entities/Treasure";

describe("Treasure", () => {
  it("should create a new Treasure instance", () => {
    const treasure = new Treasure(
      "1",
      "Golden Key",
      "Open the secret door",
      5,
      "Look for the hidden message",
      "What has a heart that doesn’t beat?"
    );

    expect(treasure).toBeInstanceOf(Treasure);
    expect(treasure.id).toBe("1");
    expect(treasure.name).toBe("Golden Key");
    expect(treasure.solution).toBe("Open the secret door");
    expect(treasure.position).toBe(5);
    expect(treasure.hint).toBe("Look for the hidden message");
    expect(treasure.riddle).toBe("What has a heart that doesn’t beat?");
  });
});
