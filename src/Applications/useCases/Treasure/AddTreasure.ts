import { TreasureRepository } from "@/Applications/Ports/spi/TreasureRepository";
import { Treasure } from "@/Domain/entities/Treasure";

type TreasureInputs = {
  name: string;
  stroy: string;
};

export class AddTreasure {
  constructor(private treasureRepository: TreasureRepository) {}

  async execute(treasure: TreasureInputs): Promise<void> {
    if (!treasure.name || !treasure.stroy) {
      throw new Error("Invalid treasure inputs");
    }
    const newTreasure = new Treasure(
      this.generateId(),
      treasure.name,
      treasure.stroy
    );
    return await this.treasureRepository.saveTreasure(newTreasure);
  }
  private generateId(): string {
    return `treasure_${Date.now()}`;
  }
}
