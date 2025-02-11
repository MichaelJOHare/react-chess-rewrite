import { MovementStrategy, Piece, Square, Move } from "../../types";
import {
  createSquare,
  createStandardMove,
  createCastlingMove,
  getPieceAt,
} from "../index";

export const kingMovementStrategy: MovementStrategy = (
  board,
  piece,
  isBoardFlipped
) => {
  const legalMoves: Move[] = [];
  let row = piece.currentSquare.row;
  let col = piece.currentSquare.col;

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  const addCastlingMoves = (
    board: Square[][],
    king: Piece,
    legalMoves: Move[]
  ) => {
    const rookPositions = isBoardFlipped
      ? { kingSideRookCol: 0, queenSideRookCol: 7 }
      : { kingSideRookCol: 7, queenSideRookCol: 0 };
    const kingSideRook = getPieceAt(
      board,
      king.currentSquare.row,
      rookPositions.kingSideRookCol
    );
    const queenSideRook = getPieceAt(
      board,
      king.currentSquare.row,
      rookPositions.queenSideRookCol
    );

    if (kingSideRook && !kingSideRook.hasMoved && !king.hasMoved) {
      legalMoves.push(
        createCastlingMove(
          king,
          kingSideRook,
          king.currentSquare,
          createSquare(
            king.currentSquare.row,
            king.currentSquare.col + 2,
            king
          ),
          kingSideRook.currentSquare,
          createSquare(
            kingSideRook.currentSquare.row,
            kingSideRook.currentSquare.col - 2,
            kingSideRook
          )
        )
      );
    }

    if (queenSideRook && !queenSideRook.hasMoved && !king.hasMoved) {
      legalMoves.push(
        createCastlingMove(
          king,
          queenSideRook,
          king.currentSquare,
          createSquare(
            king.currentSquare.row,
            king.currentSquare.col - 2,
            king
          ),
          queenSideRook.currentSquare,
          createSquare(
            queenSideRook.currentSquare.row,
            queenSideRook.currentSquare.col + 3,
            queenSideRook
          )
        )
      );
    }
  };

  directions.forEach(([dRow, dCol]) => {
    let newRow = row + dRow;
    let newCol = col + dCol;

    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const targetSquare = createSquare(newRow, newCol, piece);
      const targetPiece = getPieceAt(board, newRow, newCol);
      const capturedPiece =
        targetPiece && targetPiece.color !== piece.color
          ? targetPiece
          : undefined;
      if (capturedPiece) {
        legalMoves.push(
          createStandardMove(
            piece,
            piece.currentSquare,
            targetSquare,
            capturedPiece
          )
        );
      } else if (!targetPiece) {
        legalMoves.push(
          createStandardMove(piece, piece.currentSquare, targetSquare)
        );
      }
    }
  });
  addCastlingMoves(board, piece, legalMoves);

  return legalMoves;
};
