import { TreasureService } from "./TreasureService";
import { TreasureRepository } from "../../Applications/Ports/spi/TreasureRepository";
import { Treasure } from "../entities/Treasure";

describe("TreasureService", () => {
  let treasureService: TreasureService;
  let mockTreasureRepository: jest.Mocked<TreasureRepository>;
  const mockTreasures: Treasure[] = [
    {
      id: "1",
      name: "Gold Chest",
      solution: "Open the chest",
      position: 1,
      hint: "Look for the hidden message",
      riddle: "What has a heart that doesn’t beat?",
    },
  ];

  beforeEach(() => {
    mockTreasureRepository = {
      getTreasures: jest.fn(),
      saveTreasure: jest.fn(),
    };

    treasureService = new TreasureService(mockTreasureRepository);
  });

  describe("getTreasures", () => {
    it("should return a list of treasures", async () => {
      mockTreasureRepository.getTreasures.mockResolvedValue(mockTreasures);

      const treasures = await treasureService.getTreasures();
      expect(mockTreasureRepository.getTreasures).toHaveBeenCalledTimes(1);
      expect(treasures).toEqual(mockTreasures);
    });
  });

  describe("saveTreasure", () => {
    it("should save a treasure", async () => {
      const newTreasure: Treasure = {
        id: "2",
        name: "Silver Crown",
        solution: "some solution",
        position: 5,
        hint: "some hint",
        riddle: "some riddle",
      };
      mockTreasureRepository.saveTreasure.mockResolvedValue();

      await treasureService.saveTreasure(newTreasure);

      expect(mockTreasureRepository.saveTreasure).toHaveBeenCalledTimes(1);
      expect(mockTreasureRepository.saveTreasure).toHaveBeenCalledWith(
        newTreasure
      );
    });
  });
});
