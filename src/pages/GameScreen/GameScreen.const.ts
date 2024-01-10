export const LABEL_ICON_WIDTH = 16;
export const LABEL_ICON_HEIGHT = 16;
export const RESTART_ICON_WIDTH = 18;
export const RESTART_ICON_HEIGHT = 18;
export const LEAVE_ICON_WIDTH = 22;
export const LEAVE_ICON_HEIGHT = 22;

export const BOARD_SIZE = 3;

export const OPPONENT_MOVE_TIME = 1000;

export enum BoardCellValue {
    EMPTY = 'EMPTY',
    X_MARK_HOVER = 'X_MARK_HOVER',
    X_MARK_SET = 'X_MARK_SET',
    X_MARK_WINNER = 'X_MARK_WINNER',
    O_MARK_HOVER = 'O_MARK_HOVER',
    O_MARK_SET = 'O_MARK_SET',
    O_MARK_WINNER = 'O_MARK_WINNER',
}

export enum Winner {
    X_MARK = 'X_MARK',
    O_MARK = 'O_MARK',
    TIE = 'TIE',
}

export const INITIAL_BOARD: BoardCellValue[][] = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(0));

export const INITIAL_AVAILABLE_COORD: [number, number][] = Array(BOARD_SIZE ** 2)
    .fill(null)
    .map((_, i) => [Math.floor(i / BOARD_SIZE), i % BOARD_SIZE]);

export const cellValueToClassName: Record<BoardCellValue, string> = {
    [BoardCellValue.EMPTY]: '',
    [BoardCellValue.X_MARK_HOVER]: 'xMarkHover',
    [BoardCellValue.X_MARK_SET]: 'xMarkSet',
    [BoardCellValue.X_MARK_WINNER]: 'xMarkWinner',
    [BoardCellValue.O_MARK_HOVER]: 'oMarkHover',
    [BoardCellValue.O_MARK_SET]: 'oMarkSet',
    [BoardCellValue.O_MARK_WINNER]: 'oMarkWinner',
};

export const STATS_DATA = [
    [Winner.X_MARK, '"X" wins'],
    [Winner.O_MARK, '"O" wins'],
    [Winner.TIE, 'Ties'],
] as const;
