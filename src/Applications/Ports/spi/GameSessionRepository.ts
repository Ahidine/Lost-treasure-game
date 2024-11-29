import { GameSession } from "@/Domain/entities/GameSessions";

export interface GameSessionRepository {
  getGameSessionById(id: string): Promise<GameSession>;
  saveGameSession(gameSession: GameSession): Promise<void>;
  getGameSessionsByUserId(userId: string): Promise<GameSession[]>;
}
