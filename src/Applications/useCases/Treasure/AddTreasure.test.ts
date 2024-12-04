import { TreasureService } from "../../../Domain/services/TreasureService";
import { Treasure } from "../../../Domain/entities/Treasure";

import { TreasureRepository } from "../../Ports/spi/TreasureRepository";
import { AddTreasure, TreasureInputs } from "./AddTreasure";

jest.mock("../../../Domain/services/TreasureService");

describe("AddTreasure", () => {
  let addTreasure: AddTreasure;
  let mockTreasureService: jest.Mocked<TreasureService>;
  let mockTreasureRepository: jest.Mocked<TreasureRepository>;

  beforeEach(() => {
    mockTreasureService = new TreasureService(
      mockTreasureRepository
    ) as jest.Mocked<TreasureService>;
    addTreasure = new AddTreasure(mockTreasureService);
  });

  describe("execute", () => {
    it("should successfully save a new treasure", async () => {
      const treasureInputs: TreasureInputs = {
        name: "Golden Crown",
        solution: "Crown on the throne",
        hint: "Look for the crown",
        position: 3,
        riddle: "What sits on the throne and rules?",
      };

      const treasure = new Treasure(
        expect.any(String),
        treasureInputs.name,
        treasureInputs.solution,
        treasureInputs.position,
        treasureInputs.hint,
        treasureInputs.riddle
      );

      mockTreasureService.saveTreasure.mockResolvedValue(undefined);
      await addTreasure.execute(treasureInputs);
      expect(mockTreasureService.saveTreasure).toHaveBeenCalledTimes(1);
      expect(mockTreasureService.saveTreasure).toHaveBeenCalledWith(treasure);
    });

    it("should throw an error if required inputs are missing", async () => {
      const invalidTreasureInputs: TreasureInputs = {
        name: "",
        solution: "Crown on the throne",
        hint: "Look for the crown",
        position: 0,
        riddle: "What sits on the throne and rules?",
      };

      await expect(addTreasure.execute(invalidTreasureInputs)).rejects.toThrow(
        "Invalid treasure inputs"
      );
      expect(mockTreasureService.saveTreasure).not.toHaveBeenCalled();
    });
  });

  describe("generateId", () => {
    it("should generate a unique id", () => {
      const spy = jest
        .spyOn(addTreasure as any, "generateId")
        .mockReturnValue("treasure_123456789");

      const id = (addTreasure as any).generateId();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(id).toBe("treasure_123456789");
    });
  });
});
