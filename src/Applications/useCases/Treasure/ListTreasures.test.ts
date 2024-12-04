import { ListTreasures } from "./ListTreasures";
import { TreasureService } from "../../../Domain/services/TreasureService";
import { Treasure } from "../../../Domain/entities/Treasure";
import { TreasureRepository } from "../../Ports/spi/TreasureRepository";

jest.mock("../../../Domain/services/TreasureService");

describe("ListTreasures", () => {
  let listTreasures: ListTreasures;
  let mockTreasureService: jest.Mocked<TreasureService>;
  let mockTreasureRepository: jest.Mocked<TreasureRepository>;

  beforeEach(() => {
    mockTreasureService = new TreasureService(
      mockTreasureRepository
    ) as jest.Mocked<TreasureService>;
    listTreasures = new ListTreasures(mockTreasureService);
  });

  it("should retrieve all treasures", async () => {
    const treasures = [
      new Treasure(
        "treasure_1",
        "Golden Crown",
        "solution1",
        1,
        "hint1",
        "riddle1"
      ),
      new Treasure(
        "treasure_2",
        "Silver Key",
        "solution2",
        2,
        "hint2",
        "riddle2"
      ),
    ];

    mockTreasureService.getTreasures.mockResolvedValue(treasures);

    const result = await listTreasures.execute();

    expect(mockTreasureService.getTreasures).toHaveBeenCalledTimes(1);
    expect(result).toEqual(treasures);
  });

  it("should return an empty list when there are no treasures", async () => {
    mockTreasureService.getTreasures.mockResolvedValue([]);

    const result = await listTreasures.execute();

    expect(mockTreasureService.getTreasures).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it("should throw an error when treasure retrieval fails", async () => {
    mockTreasureService.getTreasures.mockRejectedValue(
      new Error("Failed to fetch treasures")
    );

    await expect(listTreasures.execute()).rejects.toThrow(
      "Failed to fetch treasures"
    );
  });
});
