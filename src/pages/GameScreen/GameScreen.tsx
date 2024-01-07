import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '../../components';
import {
    GameScreenButtonContainerCn,
    GameScreenCn,
    GameScreenHeaderCn,
    GameScreenLogoCn,
    GameScreenIconButtonCn,
    GameScreenLabelTurnCn,
    GameScreenBoardCn,
    GameScreenStatsCn,
    GameScreenStatsCellCn,
    GameScreenStatsCellCountCn,
    cnGameScreen,
} from './GameScreen.cn';
import {
    BOARD_SIZE,
    LABEL_ICON_HEIGHT,
    LABEL_ICON_WIDTH,
    LEAVE_ICON_HEIGHT,
    LEAVE_ICON_WIDTH,
    RESTART_ICON_HEIGHT,
    RESTART_ICON_WIDTH,
    INITIAL_BOARD,
    INITIAL_AVAILABLE_COORD,
    cellValueToClassName,
    BoardCellValue,
} from './GameScreen.const';
import { IGameScreenProps } from './GameScreen.typings';
import { Mark } from '../../App.const';

import oGray from '@assets/icons/o-gray.svg';
import xGray from '@assets/icons/x-gray.svg';
import leaveIcon from '@assets/icons/leave.svg';
import restartIcon from '@assets/icons/restart.svg';
import './GameScreen.scss';

export const GameScreen: FC<IGameScreenProps> = ({ mark }) => {
    const valBase = useMemo(() => {
        return mark === Mark.X ? BoardCellValue.X_MARK_HOVER : BoardCellValue.O_MARK_HOVER;
    }, [mark]);

    const [board, setBoard] = useState(INITIAL_BOARD);
    const [availableCoord, setAvailableCoord] = useState(INITIAL_AVAILABLE_COORD);

    const deepMatrixCopy = (M: BoardCellValue[][]) => M.map((row) => row.slice());

    const makeComputerMove = (newBoard: BoardCellValue[][], availableCoord: [number, number][]) => {
        const val = mark === Mark.X ? BoardCellValue.O_MARK_SET : BoardCellValue.X_MARK_SET;

        const i = Math.floor(Math.random() * availableCoord.length);
        const [row, col] = availableCoord[i];
        newBoard[row][col] = val;

        setBoard(newBoard);
        setAvailableCoord(availableCoord.filter((_, index) => index !== i));
    };

    useEffect(() => {
        if (mark === Mark.O) {
            makeComputerMove(deepMatrixCopy(board), availableCoord);
        }
    }, [mark]);

    const getGameScreenBoardCellCn = useCallback(
        (row: number, col: number) => {
            return cnGameScreen('BoardCell', { [cellValueToClassName[board[row][col]]]: true });
        },
        [board]
    );

    const handleBoardCellMouseEnter = (row: number, col: number) => {
        const newBoard = deepMatrixCopy(board);

        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if ([BoardCellValue.X_MARK_HOVER, BoardCellValue.O_MARK_HOVER].includes(newBoard[i][j])) {
                    newBoard[i][j] = BoardCellValue.EMPTY;
                } else if (newBoard[i][j] === BoardCellValue.EMPTY && i === row && j === col) {
                    newBoard[i][j] = valBase;
                }
            }
        }

        setBoard(newBoard);
    };

    const handleBoardCellMouseLeave = () => {
        const newBoard = deepMatrixCopy(board);

        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if ([BoardCellValue.X_MARK_HOVER, BoardCellValue.O_MARK_HOVER].includes(newBoard[i][j])) {
                    newBoard[i][j] = BoardCellValue.EMPTY;
                }
            }
        }

        setBoard(newBoard);
    };

    const handleBoardCellClick = (row: number, col: number) => {
        if ([BoardCellValue.X_MARK_SET, BoardCellValue.O_MARK_SET].includes(board[row][col])) {
            return;
        }

        const newBoard = deepMatrixCopy(board);

        if (valBase === BoardCellValue.X_MARK_HOVER) {
            newBoard[row][col] = BoardCellValue.X_MARK_SET;
        } else if (valBase === BoardCellValue.O_MARK_HOVER) {
            newBoard[row][col] = BoardCellValue.O_MARK_SET;
        }

        if (availableCoord.length === 1) {
            setBoard(newBoard);
            setAvailableCoord([]);
        } else {
            makeComputerMove(
                newBoard,
                availableCoord.filter(([r, c]) => r !== row || c !== col)
            );
        }
    };

    return (
        <div className={GameScreenCn}>
            <header className={GameScreenHeaderCn}>
                <Logo className={GameScreenLogoCn} />
                <div className={GameScreenLabelTurnCn}>
                    <img src={mark === Mark.X ? xGray : oGray} width={LABEL_ICON_WIDTH} height={LABEL_ICON_HEIGHT} />
                    turn
                </div>
                <div className={GameScreenButtonContainerCn}>
                    <Link className={GameScreenIconButtonCn} to="/game" reloadDocument>
                        <img src={restartIcon} width={RESTART_ICON_WIDTH} height={RESTART_ICON_HEIGHT} />
                    </Link>
                    <Link className={GameScreenIconButtonCn} to="/" replace>
                        <img src={leaveIcon} width={LEAVE_ICON_WIDTH} height={LEAVE_ICON_HEIGHT} />
                    </Link>
                </div>
            </header>
            <div className={GameScreenBoardCn}>
                {board.map((rowValues, currentRow) =>
                    rowValues.map((_, currentCol) => {
                        return (
                            <div
                                key={currentRow * BOARD_SIZE + currentCol}
                                className={getGameScreenBoardCellCn(currentRow, currentCol)}
                                onMouseEnter={() => handleBoardCellMouseEnter(currentRow, currentCol)}
                                onMouseLeave={() => handleBoardCellMouseLeave()}
                                onClick={() => handleBoardCellClick(currentRow, currentCol)}
                            />
                        );
                    })
                )}
            </div>
            <footer className={GameScreenStatsCn}>
                <div className={GameScreenStatsCellCn}>
                    <div>"O" wins</div>
                    <span className={GameScreenStatsCellCountCn}>1</span>
                </div>
                <div className={GameScreenStatsCellCn}>
                    <div>Ties</div>
                    <span className={GameScreenStatsCellCountCn}>2</span>
                </div>
                <div className={GameScreenStatsCellCn}>
                    <div>"X" wins</div>
                    <span className={GameScreenStatsCellCountCn}>3</span>
                </div>
            </footer>
        </div>
    );
};
