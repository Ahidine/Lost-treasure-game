import { Treasure } from "@/Domain/entities/Treasure";
import { TreasureService } from "@/Domain/services/TreasureService";

export class ListTreasures {
  constructor(private treasureService: TreasureService) {}

  async execute(): Promise<Treasure[]> {
    return this.treasureService.getTreasures();
  }
}
