import { Treasure } from "@/Domain/entities/Treasure";
import { TreasureService } from "@/Domain/services/TreasureService";

export type TreasureInputs = {
  name: string;
  solution: string;
  hint: string;
  position: number;
  riddle: string;
};

export class AddTreasure {
  constructor(private treasureService: TreasureService) {}

  async execute(treasure: TreasureInputs): Promise<void> {
    if (!treasure.name || !treasure.position) {
      throw new Error("Invalid treasure inputs");
    }
    const newTreasure = new Treasure(
      this.generateId(),
      treasure.name,
      treasure.solution,
      treasure.position,
      treasure.hint,
      treasure.riddle
    );
    return await this.treasureService.saveTreasure(newTreasure);
  }
  private generateId(): string {
    return `treasure_${Date.now()}`;
  }
}
