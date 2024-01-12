import { Mark } from '../../App.const';

export const LABEL_ICON_WIDTH = 16;
export const LABEL_ICON_HEIGHT = 16;
export const RESTART_ICON_WIDTH = 18;
export const RESTART_ICON_HEIGHT = 18;
export const LEAVE_ICON_WIDTH = 22;
export const LEAVE_ICON_HEIGHT = 22;

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

export const INITIAL_BOARD: BoardCellValue[][] = Array(3)
    .fill(null)
    .map(() => Array(3).fill(BoardCellValue.EMPTY));

export const cellValToClassName: Record<BoardCellValue, string> = {
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

export const markHoverToMarkSet = {
    [BoardCellValue.X_MARK_HOVER]: BoardCellValue.X_MARK_SET,
    [BoardCellValue.O_MARK_HOVER]: BoardCellValue.O_MARK_SET,
};

export const winnerToMarkSet = {
    [Winner.X_MARK]: BoardCellValue.X_MARK_SET,
    [Winner.O_MARK]: BoardCellValue.O_MARK_SET,
};

export const winnerToMarkWinner = {
    [Winner.X_MARK]: BoardCellValue.X_MARK_WINNER,
    [Winner.O_MARK]: BoardCellValue.O_MARK_WINNER,
};

export const markToHover = {
    [Mark.X]: BoardCellValue.X_MARK_HOVER,
    [Mark.O]: BoardCellValue.O_MARK_HOVER,
};

export const markToMarkSet = {
    [Mark.X]: BoardCellValue.X_MARK_SET,
    [Mark.O]: BoardCellValue.O_MARK_SET,
};

export const markToWinner = {
    [Mark.X]: Winner.X_MARK,
    [Mark.O]: Winner.O_MARK,
};
