import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    GameScreenFooterCn,
    GameScreenStatsOpponentLabelCn,
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
    OPPONENT_MOVE_TIME,
    cellValueToClassName,
    BoardCellValue,
    STATS_OBJECT,
} from './GameScreen.const';
import { IGameScreenProps, Winner } from './GameScreen.typings';
import { deepMatrixCopy, getUpdatedStats } from './GameScreen.helpers';
import { Mark } from '../../App.const';

import oGray from '@assets/icons/o-gray.svg';
import xGray from '@assets/icons/x-gray.svg';
import leaveIcon from '@assets/icons/leave.svg';
import restartIcon from '@assets/icons/restart.svg';
import './GameScreen.scss';

export const GameScreen: FC<IGameScreenProps> = ({ playerMark }) => {
    const valBase = useMemo(() => {
        return playerMark === Mark.X ? BoardCellValue.X_MARK_HOVER : BoardCellValue.O_MARK_HOVER;
    }, [playerMark]);

    const computerMark = playerMark === Mark.X ? Mark.O : Mark.X;

    const opponentTimeout = useRef<ReturnType<typeof setTimeout>>();
    const [board, setBoard] = useState(INITIAL_BOARD);
    const [availableCoord, setAvailableCoord] = useState(INITIAL_AVAILABLE_COORD);
    const [currentMark, setCurrentMark] = useState(Mark.X);
    const [gameEnded, setGameEnded] = useState(false);

    const [statsKeyVal, setStatsKeyVal] = useState<[Winner, number][]>(
        (Object.keys(STATS_OBJECT) as Winner[]).map((key) => [key, 0])
    );

    const resetGame = () => {
        clearTimeout(opponentTimeout.current);
        setCurrentMark(Mark.X);
        setBoard(INITIAL_BOARD);
        setAvailableCoord(INITIAL_AVAILABLE_COORD);
        setGameEnded(false);

        if (playerMark === Mark.O) {
            makeComputerMove(deepMatrixCopy(INITIAL_BOARD), INITIAL_AVAILABLE_COORD, null);
        }
    };

    const updateStats = (winner: Winner) => {
        const statsKeyValCopy = [...statsKeyVal];
        statsKeyValCopy[statsKeyValCopy.findIndex(([key, _]) => key === String(winner))][1]++;
        setStatsKeyVal(statsKeyValCopy);
    };

    const makeComputerMove = (
        newBoard: BoardCellValue[][],
        availableCoord: [number, number][],
        winner: Winner | null
    ) => {
        if (winner !== null) {
            updateStats(winner);
            return;
        }

        if (availableCoord.length === 0) {
            updateStats('tie');
            return;
        }

        setCurrentMark(computerMark);

        opponentTimeout.current = setTimeout(() => {
            setCurrentMark(playerMark);

            const val = playerMark === Mark.X ? BoardCellValue.O_MARK_SET : BoardCellValue.X_MARK_SET;

            const i = Math.floor(Math.random() * availableCoord.length);
            const [row, col] = availableCoord[i];
            newBoard[row][col] = val;

            const [updatedBoard, winner] = getUpdatedStats(newBoard);

            setAvailableCoord(availableCoord.filter((_, index) => i !== index));
            setBoard(updatedBoard);

            if (winner) {
                setGameEnded(true);
                updateStats(winner);
            }
        }, OPPONENT_MOVE_TIME);
    };

    useEffect(() => {
        if (playerMark === Mark.O) {
            makeComputerMove(deepMatrixCopy(board), availableCoord, null);
        }
    }, [playerMark]);

    const getGameScreenBoardCellCn = useCallback(
        (row: number, col: number) => {
            return cnGameScreen('BoardCell', { [cellValueToClassName[board[row][col]]]: true });
        },
        [board]
    );

    const handleBoardCellMouseHover = (row: number, col: number) => {
        if (currentMark !== playerMark || gameEnded || board[row][col] !== BoardCellValue.EMPTY) {
            return;
        }

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
        if (currentMark !== playerMark || gameEnded) {
            return;
        }

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
        if (
            [BoardCellValue.X_MARK_SET, BoardCellValue.O_MARK_SET].includes(board[row][col]) ||
            currentMark !== playerMark ||
            gameEnded
        ) {
            return;
        }

        const newBoard = deepMatrixCopy(board);

        if (valBase === BoardCellValue.X_MARK_HOVER) {
            newBoard[row][col] = BoardCellValue.X_MARK_SET;
        } else if (valBase === BoardCellValue.O_MARK_HOVER) {
            newBoard[row][col] = BoardCellValue.O_MARK_SET;
        }

        const newAvailableCoord = availableCoord.filter(([r, c]) => r !== row || c !== col);

        const [updatedBoard, winner] = getUpdatedStats(newBoard);

        setAvailableCoord(newAvailableCoord);
        setBoard(updatedBoard);
        setGameEnded(winner !== null);

        makeComputerMove(newBoard, newAvailableCoord, winner);
    };

    return (
        <div className={GameScreenCn}>
            <header className={GameScreenHeaderCn}>
                <Logo className={GameScreenLogoCn} />
                <div className={GameScreenLabelTurnCn}>
                    <img
                        src={currentMark === Mark.X ? xGray : oGray}
                        width={LABEL_ICON_WIDTH}
                        height={LABEL_ICON_HEIGHT}
                    />
                    turn
                </div>
                <div className={GameScreenButtonContainerCn}>
                    <button className={GameScreenIconButtonCn} onClick={resetGame}>
                        <img src={restartIcon} width={RESTART_ICON_WIDTH} height={RESTART_ICON_HEIGHT} />
                    </button>
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
                                onMouseMove={() => handleBoardCellMouseHover(currentRow, currentCol)}
                                onMouseLeave={() => handleBoardCellMouseLeave()}
                                onClick={() => handleBoardCellClick(currentRow, currentCol)}
                            />
                        );
                    })
                )}
            </div>
            <footer className={GameScreenFooterCn}>
                <div className={GameScreenStatsCn}>
                    {statsKeyVal.map(([key, value]) => (
                        <div key={key} className={GameScreenStatsCellCn}>
                            <div>{STATS_OBJECT[key]}</div>
                            <span className={GameScreenStatsCellCountCn}>{value}</span>
                        </div>
                    ))}
                </div>
                {playerMark !== currentMark && (
                    <p className={GameScreenStatsOpponentLabelCn}>Your opponent is thinking...</p>
                )}
            </footer>
        </div>
    );
};
