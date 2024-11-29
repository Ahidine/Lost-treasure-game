import { Treasure } from "./Treasure";

export class GameSession {
  constructor(
    public id: string,
    public userId: string,
    public treasuresFound: Treasure[],
    public status: string,
    public dateStarted: string
  ) {}
}
