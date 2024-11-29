import { Treasure } from "@/Domain/entities/Treasure";

export interface TreasuresApi {
  getTreasures(): Promise<Treasure[]>;
  saveTreasure(treasure: Treasure): Promise<void>;
}
