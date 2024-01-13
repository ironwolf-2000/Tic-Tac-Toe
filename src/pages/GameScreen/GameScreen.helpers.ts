import { Difficulty, Mark } from '../../App.const';
import {
    BoardCellValue,
    MarkState,
    Winner,
    markToMarkSet,
    markToWinner,
    winnerToMarkSet,
    winnerToMarkWinner,
} from './GameScreen.const';
import { Move } from './GameScreen.typings';

export const deepMatrixCopy = <T>(M: T[][]) => M.map((row) => row.slice());

export const getBoardCellMarkState = (board: BoardCellValue[][], row: number, col: number): [Mark, MarkState] | [] => {
    switch (board[row][col]) {
        case BoardCellValue.X_MARK_HOVER:
            return [Mark.X, MarkState.HOVER];
        case BoardCellValue.X_MARK_SET:
            return [Mark.X, MarkState.SET];
        case BoardCellValue.X_MARK_WINNER:
            return [Mark.X, MarkState.WINNER];
        case BoardCellValue.O_MARK_HOVER:
            return [Mark.O, MarkState.HOVER];
        case BoardCellValue.O_MARK_SET:
            return [Mark.O, MarkState.SET];
        case BoardCellValue.O_MARK_WINNER:
            return [Mark.O, MarkState.WINNER];
        default:
            return [];
    }
};

export const isBoardCellAvailable = (cellValue: BoardCellValue): boolean => {
    return ![BoardCellValue.X_MARK_SET, BoardCellValue.O_MARK_SET].includes(cellValue);
};

const availableCellCount = (board: BoardCellValue[][]): number => {
    let count = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (isBoardCellAvailable(board[i][j])) {
                count++;
            }
        }
    }

    return count;
};

export const determineWinner = (board: BoardCellValue[][]): Winner | null => {
    const marks = [
        [BoardCellValue.X_MARK_SET, Winner.X_MARK],
        [BoardCellValue.O_MARK_SET, Winner.O_MARK],
    ] as const;

    for (const direction of ['rows', 'columns']) {
        for (let i = 0; i < board.length; i++) {
            const count = {} as Record<BoardCellValue, number>;

            for (let j = 0; j < board.length; j++) {
                const val = direction === 'rows' ? board[i][j] : board[j][i];

                if (!(val in count)) {
                    count[val] = 0;
                }

                count[val]++;
            }

            for (const [markSet, winner] of marks) {
                if (count[markSet] === board.length) {
                    return winner;
                }
            }
        }
    }

    for (const diagonal of ['main', 'anti']) {
        const count = {} as Record<BoardCellValue, number>;

        for (let i = 0; i < board.length; i++) {
            const val = diagonal === 'main' ? board[i][i] : board[i][board.length - 1 - i];

            if (!(val in count)) {
                count[val] = 0;
            }

            count[val]++;
        }

        for (const [markSet, winner] of marks) {
            if (count[markSet] === board.length) {
                return winner;
            }
        }
    }

    return availableCellCount(board) === 0 ? Winner.TIE : null;
};

export const getUpdatedBoard = (board: BoardCellValue[][]): BoardCellValue[][] => {
    const winner = determineWinner(board);

    if (winner === null || winner === Winner.TIE) {
        return board;
    }

    for (const direction of ['rows', 'columns']) {
        for (let i = 0; i < board.length; i++) {
            let markAsWinner = true;

            for (let j = 0; j < board.length; j++) {
                if ((direction === 'rows' ? board[i][j] : board[j][i]) !== winnerToMarkSet[winner]) {
                    markAsWinner = false;
                    break;
                }
            }

            if (markAsWinner) {
                for (let j = 0; j < board.length; j++) {
                    if (direction === 'rows') {
                        board[i][j] = winnerToMarkWinner[winner];
                    } else {
                        board[j][i] = winnerToMarkWinner[winner];
                    }
                }

                return board;
            }
        }
    }

    for (const diagonal of ['main', 'anti']) {
        let markAsWinner = true;

        for (let i = 0; i < board.length; i++) {
            const j = diagonal === 'main' ? i : board.length - 1 - i;

            if (board[i][j] !== winnerToMarkSet[winner]) {
                markAsWinner = false;
                break;
            }
        }

        if (markAsWinner) {
            for (let i = 0; i < board.length; i++) {
                const j = diagonal === 'main' ? i : board.length - 1 - i;
                board[i][j] = winnerToMarkWinner[winner];
            }

            return board;
        }
    }

    return board;
};

const minimax = (
    board: BoardCellValue[][],
    depth: number,
    turn: Mark,
    player: Mark,
    opponent: Mark
): [number, Move] => {
    const largeVal = board.length * board.length + 1;
    const winner = determineWinner(board);

    if (markToWinner[player] === winner) {
        return [largeVal - depth, null];
    }

    if (markToWinner[opponent] === winner) {
        return [depth - largeVal, null];
    }

    if (winner === Winner.TIE) {
        return [0, null];
    }

    const scores: number[] = [];
    const moves: Move[] = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (isBoardCellAvailable(board[i][j])) {
                const previousVal = board[i][j];
                board[i][j] = markToMarkSet[turn];

                scores.push(minimax(board, depth + 1, turn === player ? opponent : player, player, opponent)[0]);
                moves.push([i, j]);

                board[i][j] = previousVal;
            }
        }
    }

    const func = turn === player ? Math.max : Math.min;
    const target = func(...scores);
    const i = scores.findIndex((el) => el === target);

    return [scores[i], moves[i]];
};

const getRandomMove = (board: BoardCellValue[][]): Move => {
    const availableCoord: [number, number][] = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (isBoardCellAvailable(board[i][j])) {
                availableCoord.push([i, j]);
            }
        }
    }

    const i = Math.floor(Math.random() * availableCoord.length);

    return availableCoord.length ? availableCoord[i] : null;
};

const getBestMove = (board: BoardCellValue[][], player: Mark): Move => {
    const opponent = player === Mark.X ? Mark.O : Mark.X;

    return minimax(board, 0, player, player, opponent)[1];
};

export const getNextMove = (board: BoardCellValue[][], player: Mark, difficulty: Difficulty): Move => {
    const randomMove = getRandomMove(board);

    if (availableCellCount(board) === board.length * board.length) {
        return randomMove;
    }

    const bestMove = getBestMove(board, player);
    const i = Math.floor(Math.random() * 2);

    switch (difficulty) {
        case Difficulty.EASY:
            return randomMove;
        case Difficulty.HARD:
            return bestMove;
        default:
            return [randomMove, bestMove][i];
    }
};
