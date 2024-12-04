import { TreasureRepository } from "@/Applications/Ports/spi/TreasureRepository";
import { Treasure } from "@/Domain/entities/Treasure";

export class TreasureService {
  constructor(private treasureRepository: TreasureRepository) {}

  async getTreasures(): Promise<Treasure[]> {
    return this.treasureRepository.getTreasures();
  }

  async saveTreasure(treasure: Treasure): Promise<void> {
    return this.treasureRepository.saveTreasure(treasure);
  }
}
