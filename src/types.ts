export type Game = {
  gameId: number;
  player1: string;
  player2: string;
  player1Score: number;
  player2Score: number;
  isRunning: boolean;
  tiles: string[][],
  lastMove: Move | null
};

export type Move = {
  player: string;
  moveType: string;
  word: string;
  points: number;
  letterPlacements: Coordinate[];
};

export type Coordinate = {
  x: number;
  y: number;
}
