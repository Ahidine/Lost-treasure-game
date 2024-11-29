import { GameSessionRepository } from "@/Applications/Ports/spi/GameSessionRepository";
import { GameSession } from "../entities/GameSessions";

export class GameSessionService {
  constructor(private gameSession: GameSessionRepository) {}

  async getGameSessionById(id: string): Promise<GameSession> {
    return this.gameSession.getGameSessionById(id);
  }

  async saveGameSession(gameSession: GameSession): Promise<void> {
    return this.gameSession.saveGameSession(gameSession);
  }
}
