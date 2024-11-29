import { TreasureRepository } from "@/Applications/Ports/spi/TreasureRepository";
import { Treasure } from "@/Domain/entities/Treasure";

export class ListTreasures {
  constructor(private treasureRepository: TreasureRepository) {}

  async execute(): Promise<Treasure[]> {
    return this.treasureRepository.getTreasures();
  }
}
