import { TreasuresApi } from "@/Applications/Ports/api/TreasuresApi";
import {
  AddTreasure,
  TreasureInputs,
} from "@/Applications/useCases/Treasure/AddTreasure";
import { ListTreasures } from "@/Applications/useCases/Treasure/ListTreasures";
import { Treasure } from "@/Domain/entities/Treasure";
import { TreasureService } from "@/Domain/services/TreasureService";

export class TreasureController implements TreasuresApi {
  constructor(readonly treasureService: TreasureService) {}

  async getTreasures(): Promise<Treasure[]> {
    try {
      const listTreasures = new ListTreasures(this.treasureService);
      return await listTreasures.execute();
    } catch (error) {
      throw new Error("Error while getting treasures");
    }
  }

  async saveTreasure(treasure: TreasureInputs): Promise<void> {
    try {
      const addTreasure = new AddTreasure(this.treasureService);
      return await addTreasure.execute(treasure);
    } catch (error) {
      throw new Error("Error while getting treasures");
    }
  }
}
