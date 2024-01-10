import { BoardCellValue, BOARD_SIZE, Winner } from './GameScreen.const';

export const deepMatrixCopy = <T>(M: T[][]) => M.map((row) => row.slice());

export const getUpdatedStats = (board: BoardCellValue[][]): [BoardCellValue[][], Winner | null] => {
    const marks = [
        [BoardCellValue.X_MARK_SET, BoardCellValue.X_MARK_WINNER, Winner.X_MARK],
        [BoardCellValue.O_MARK_SET, BoardCellValue.O_MARK_WINNER, Winner.O_MARK],
    ] as const;

    // rows
    for (let i = 0; i < BOARD_SIZE; i++) {
        const count = {} as Record<BoardCellValue, number>;

        for (let j = 0; j < BOARD_SIZE; j++) {
            if (!(board[i][j] in count)) {
                count[board[i][j]] = 0;
            }

            count[board[i][j]]++;
        }

        for (const [markSet, markWinner, winner] of marks) {
            if (count[markSet] === BOARD_SIZE) {
                for (let j = 0; j < BOARD_SIZE; j++) {
                    board[i][j] = markWinner;
                }

                return [board, winner];
            }
        }
    }

    // columns
    for (let i = 0; i < BOARD_SIZE; i++) {
        const count = {} as Record<BoardCellValue, number>;

        for (let j = 0; j < BOARD_SIZE; j++) {
            if (!(board[j][i] in count)) {
                count[board[j][i]] = 0;
            }

            count[board[j][i]]++;
        }

        for (const [markSet, markWinner, winner] of marks) {
            if (count[markSet] === BOARD_SIZE) {
                for (let j = 0; j < BOARD_SIZE; j++) {
                    board[j][i] = markWinner;
                }

                return [board, winner];
            }
        }
    }

    // diagonals
    for (let k = 0; k < 2; k++) {
        const count = {} as Record<BoardCellValue, number>;

        for (let i = 0; i < BOARD_SIZE; i++) {
            let j = k === 0 ? i : BOARD_SIZE - 1 - i;

            if (!(board[i][j] in count)) {
                count[board[i][j]] = 0;
            }

            count[board[i][j]]++;
        }

        for (const [markSet, markWinner, winner] of marks) {
            if (count[markSet] === BOARD_SIZE) {
                for (let i = 0; i < BOARD_SIZE; i++) {
                    const j = k === 0 ? i : BOARD_SIZE - 1 - i;
                    board[i][j] = markWinner;
                }

                return [board, winner];
            }
        }
    }

    return [board, null];
};
