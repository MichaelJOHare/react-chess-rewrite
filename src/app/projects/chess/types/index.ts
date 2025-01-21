export type Square = {
  row: number;
  col: number;
  piece?: Piece;
};

export type Piece = {
  id: string;
  player: Player;
  type: PieceType;
  color: PlayerColor;
  currentSquare: Square;
  movementStrategy: MovementStrategy;
  isAlive: boolean;
  hasMoved?: boolean;
};

export interface MovementStrategy {
  (
    board: Square[][],
    piece: Piece,
    isBoardFlipped?: boolean,
    moveHistory?: Move[]
  ): Move[];
}

export enum PieceType {
  PAWN = "pawn",
  ROOK = "rook",
  KNIGHT = "knight",
  BISHOP = "bishop",
  QUEEN = "queen",
  KING = "king",
}

export type Player = {
  color: PlayerColor;
  type: PlayerType;
};

export enum PlayerColor {
  WHITE = "white",
  BLACK = "black",
}

export enum PlayerType {
  HUMAN = "Human",
  COMPUTER = "Computer",
}

export type GameState = {
  board: Square[][];
  players: Player[];
  piecesByPlayer: Map<Player, Piece[]>;
  currentPlayerIndex: number;
  currentPlayerMoves: Move[];
  capturedPieces: Piece[];
  kingSquare: Square | undefined;
  isKingInCheck: boolean;
  moveHistory: Move[];
  undoneMoves: Move[];
  halfMoveClock: number;
  fullMoveNumber: number;
};

export enum MoveType {
  STNDRD = "Standard",
  CASTLE = "Castling",
  EP = "EnPassant",
  PROMO = "Promotion",
}

export interface Move {
  type: MoveType;
  from: Square;
  to: Square;
  piece: Piece;
  capturedPiece?: Piece;
  isPromotion?: boolean;
  isCapture?: boolean;
}

export interface CastlingMove extends Move {
  rook: Piece;
  kingFrom: Square;
  kingTo: Square;
  rookFrom: Square;
  rookTo: Square;
}

export interface EnPassantMove extends Move {
  capturedPieceSquare: Square;
}

export interface PromotionMove extends Move {
  promotionType: PieceType;
}
