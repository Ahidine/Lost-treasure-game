import { Treasure } from "@/Domain/entities/Treasure";

export interface TreasureRepository {
  getTreasures(): Promise<Treasure[]>;
  saveTreasure(treasure: Treasure): Promise<void>;
}
