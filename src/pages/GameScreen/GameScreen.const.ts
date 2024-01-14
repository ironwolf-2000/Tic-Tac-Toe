import { Mark } from '../../App.const';

export const LABEL_ICON_WIDTH = 16;
export const LABEL_ICON_HEIGHT = 16;
export const RESTART_ICON_WIDTH = 18;
export const RESTART_ICON_HEIGHT = 18;
export const LEAVE_ICON_WIDTH = 22;
export const LEAVE_ICON_HEIGHT = 22;

export const MODAL_HIDING_TIME = 200;

export enum BoardCellValue {
    EMPTY = 'EMPTY',
    X_MARK_HOVER = 'X_MARK_HOVER',
    X_MARK_SET = 'X_MARK_SET',
    X_MARK_WINNER = 'X_MARK_WINNER',
    O_MARK_HOVER = 'O_MARK_HOVER',
    O_MARK_SET = 'O_MARK_SET',
    O_MARK_WINNER = 'O_MARK_WINNER',
}

export enum MarkState {
    HOVER = 'HOVER',
    SET = 'SET',
    WINNER = 'WINNER',
}

export enum Winner {
    X_MARK = 'X_MARK',
    O_MARK = 'O_MARK',
    TIE = 'TIE',
}

export const INITIAL_BOARD: BoardCellValue[][] = Array(3)
    .fill(null)
    .map(() => Array(3).fill(BoardCellValue.EMPTY));

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
