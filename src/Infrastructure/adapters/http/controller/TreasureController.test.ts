import { TreasureRepository } from "../../../../Applications/Ports/spi/TreasureRepository";
import { AddTreasure } from "../../../../Applications/useCases/Treasure/AddTreasure";
import { ListTreasures } from "../../../../Applications/useCases/Treasure/ListTreasures";
import { Treasure } from "../../../../Domain/entities/Treasure";
import { TreasureService } from "../../../../Domain/services/TreasureService";
import { TreasureController } from "./TreasureController";

jest.mock("../../../../Domain/services/TreasureService");
jest.mock("../../../../Applications/useCases/Treasure/AddTreasure");
jest.mock("../../../../Applications/useCases/Treasure/ListTreasures");

describe("TreasureController", () => {
  let treasureController: TreasureController;
  let mockTreasureService: jest.Mocked<TreasureService>;
  let mockTreasureRepository: jest.Mocked<TreasureRepository>;

  const mockTreasure: Treasure = {
    id: "treasure123",
    name: "Golden Chalice",
    solution: "Answer to riddle",
    position: 1,
    hint: "Hidden in plain sight",
    riddle:
      "What has roots as nobody sees, Is taller than trees, Up, up it goes, And yet never grows?",
  };

  const treasureInputs = {
    name: "Golden Chalice",
    solution: "Answer to riddle",
    hint: "Hidden in plain sight",
    position: 1,
    riddle:
      "What has roots as nobody sees, Is taller than trees, Up, up it goes, And yet never grows?",
  };

  beforeEach(() => {
    mockTreasureService = new TreasureService(
      mockTreasureRepository
    ) as jest.Mocked<TreasureService>;
    treasureController = new TreasureController(mockTreasureService);
  });

  it("should get all treasures", async () => {
    (ListTreasures.prototype.execute as jest.Mock).mockResolvedValueOnce([
      mockTreasure,
    ]);

    const result = await treasureController.getTreasures();

    expect(result).toEqual([mockTreasure]);
    expect(ListTreasures.prototype.execute).toHaveBeenCalled();
  });

  it("should save a treasure", async () => {
    (AddTreasure.prototype.execute as jest.Mock).mockResolvedValueOnce(
      undefined
    );

    await treasureController.saveTreasure(treasureInputs);

    expect(AddTreasure.prototype.execute).toHaveBeenCalledWith(treasureInputs);
  });

  it("should throw an error when getTreasures fails", async () => {
    (ListTreasures.prototype.execute as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch treasures")
    );

    await expect(treasureController.getTreasures()).rejects.toThrow(
      "Error while getting treasures"
    );
  });

  it("should throw an error when saveTreasure fails", async () => {
    (AddTreasure.prototype.execute as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to save treasure")
    );

    await expect(
      treasureController.saveTreasure(treasureInputs)
    ).rejects.toThrow("Error while getting treasures");
  });
});
