import { BoardCellValue, BOARD_SIZE } from './GameScreen.const';
import { Winner } from './GameScreen.typings';

export const deepMatrixCopy = <T>(M: T[][]) => M.map((row) => row.slice());

export const getUpdatedStats = (board: BoardCellValue[][]): [BoardCellValue[][], Winner | null] => {
    const marks = [
        [BoardCellValue.X_MARK_SET, BoardCellValue.X_MARK_WINNER],
        [BoardCellValue.O_MARK_SET, BoardCellValue.O_MARK_WINNER],
    ] as const;

    // rows
    for (let i = 0; i < BOARD_SIZE; i++) {
        const count: Record<number, number> = {};

        for (let j = 0; j < BOARD_SIZE; j++) {
            if (!(board[i][j] in count)) {
                count[board[i][j]] = 0;
            }

            count[board[i][j]]++;
        }

        for (const [markSet, markWinner] of marks) {
            if (count[markSet] === BOARD_SIZE) {
                for (let j = 0; j < BOARD_SIZE; j++) {
                    board[i][j] = markWinner;
                }

                return [board, markWinner];
            }
        }
    }

    // columns
    for (let i = 0; i < BOARD_SIZE; i++) {
        const count: Record<number, number> = {};

        for (let j = 0; j < BOARD_SIZE; j++) {
            if (!(board[j][i] in count)) {
                count[board[j][i]] = 0;
            }

            count[board[j][i]]++;
        }

        for (const [markSet, markWinner] of marks) {
            if (count[markSet] === BOARD_SIZE) {
                for (let j = 0; j < BOARD_SIZE; j++) {
                    board[j][i] = markWinner;
                }

                return [board, markWinner];
            }
        }
    }

    // diagonals
    for (let k = 0; k < 2; k++) {
        const count: Record<number, number> = {};

        for (let i = 0; i < BOARD_SIZE; i++) {
            let j = k === 0 ? i : BOARD_SIZE - 1 - i;

            if (!(board[i][j] in count)) {
                count[board[i][j]] = 0;
            }

            count[board[i][j]]++;
        }

        for (const [markSet, markWinner] of marks) {
            if (count[markSet] === BOARD_SIZE) {
                for (let i = 0; i < BOARD_SIZE; i++) {
                    const j = k === 0 ? i : BOARD_SIZE - 1 - i;
                    board[i][j] = markWinner;
                }

                return [board, markWinner];
            }
        }
    }

    return [board, null];
};
