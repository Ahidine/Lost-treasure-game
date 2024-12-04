import { TreasureInputs } from "@/Applications/useCases/Treasure/AddTreasure";
import { Treasure } from "@/Domain/entities/Treasure";
export interface TreasuresApi {
  getTreasures(): Promise<Treasure[]>;
  saveTreasure(treasure: TreasureInputs): Promise<void>;
}
