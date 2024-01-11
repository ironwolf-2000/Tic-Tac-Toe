import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { Difficulty, Mark } from '../../App.const';
import { Logo } from '../../components';
import {
    GameScreenButtonContainerCn,
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
    LABEL_ICON_HEIGHT,
    LABEL_ICON_WIDTH,
    LEAVE_ICON_HEIGHT,
    LEAVE_ICON_WIDTH,
    RESTART_ICON_HEIGHT,
    RESTART_ICON_WIDTH,
    INITIAL_BOARD,
    OPPONENT_MOVE_TIME,
    STATS_DATA,
    cellValToClassName,
    BoardCellValue,
    Winner,
    markToHover,
    markToMarkSet,
} from './GameScreen.const';
import { IGameScreenProps } from './GameScreen.typings';
import {
    deepMatrixCopy,
    determineWinner,
    getNextMove,
    getUpdatedBoard,
    isBoardCellAvailable,
} from './GameScreen.helpers';
import { QuitGameModal } from './components/QuitGameModal';

import oGray from '@assets/icons/o-gray.svg';
import xGray from '@assets/icons/x-gray.svg';
import leaveIcon from '@assets/icons/leave.svg';
import restartIcon from '@assets/icons/restart.svg';
import './GameScreen.scss';

export const GameScreen: FC<IGameScreenProps> = ({ playerMark }) => {
    const computerMark = playerMark === Mark.X ? Mark.O : Mark.X;

    const opponentTimeout = useRef<ReturnType<typeof setTimeout>>();
    const [board, setBoard] = useState(INITIAL_BOARD);
    const [currentMark, setCurrentMark] = useState(Mark.X);
    const [gameEnded, setGameEnded] = useState(false);
    const [quitGameModalVisible, setQuitGameModalVisible] = useState(false);

    const GameScreenCn = cnGameScreen('', { withOverlay: quitGameModalVisible });

    const [statsValues, setStatsValues] = useState<[Winner, string, number][]>(
        STATS_DATA.map(([key, label]) => [key, label, 0])
    );

    const resetGame = () => {
        clearTimeout(opponentTimeout.current);
        setCurrentMark(playerMark);
        setBoard(INITIAL_BOARD);
        setGameEnded(false);

        if (playerMark === Mark.O) {
            makeComputerMove(deepMatrixCopy(INITIAL_BOARD));
        }
    };

    const updateStats = (winner: Winner) => {
        const statsValuesCopy = [...statsValues];
        statsValuesCopy[statsValuesCopy.findIndex(([key, _, __]) => key === winner)][2]++;
        setStatsValues(statsValuesCopy);
    };

    useEffect(() => {
        if (playerMark === Mark.O) {
            makeComputerMove(deepMatrixCopy(board));
        }

        return () => clearTimeout(opponentTimeout.current);
    }, [playerMark]);

    const getGameScreenBoardCellCn = useCallback(
        (row: number, col: number) => cnGameScreen('BoardCell', { [cellValToClassName[board[row][col]]]: true }),
        [board]
    );

    const handleBoardCellMouseHover = (row: number, col: number) => {
        if (currentMark !== playerMark || gameEnded || board[row][col] !== BoardCellValue.EMPTY) {
            return;
        }

        const newBoard = deepMatrixCopy(board);

        for (let i = 0; i < newBoard.length; i++) {
            for (let j = 0; j < newBoard.length; j++) {
                if ([BoardCellValue.X_MARK_HOVER, BoardCellValue.O_MARK_HOVER].includes(newBoard[i][j])) {
                    newBoard[i][j] = BoardCellValue.EMPTY;
                } else if (newBoard[i][j] === BoardCellValue.EMPTY && i === row && j === col) {
                    newBoard[i][j] = markToHover[playerMark];
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

        for (let i = 0; i < newBoard.length; i++) {
            for (let j = 0; j < newBoard.length; j++) {
                if ([BoardCellValue.X_MARK_HOVER, BoardCellValue.O_MARK_HOVER].includes(newBoard[i][j])) {
                    newBoard[i][j] = BoardCellValue.EMPTY;
                }
            }
        }

        setBoard(newBoard);
    };

    const updateForWinner = (board: BoardCellValue[][], playerMove?: boolean) => {
        const winner = determineWinner(board);

        if (winner) {
            setBoard(getUpdatedBoard(board));
            setGameEnded(true);
            updateStats(winner);
        } else {
            setBoard(board);

            if (playerMove) {
                makeComputerMove(board);
                setCurrentMark(computerMark);
            } else {
                setCurrentMark(playerMark);
            }
        }
    };

    const makeComputerMove = (newBoard: BoardCellValue[][]) => {
        opponentTimeout.current = setTimeout(() => {
            const move = getNextMove(newBoard, computerMark, Difficulty.MEDIUM);

            if (move) {
                const computerMarkSet = playerMark === Mark.X ? BoardCellValue.O_MARK_SET : BoardCellValue.X_MARK_SET;
                const [row, col] = move;
                newBoard[row][col] = computerMarkSet;

                updateForWinner(newBoard);
            }
        }, OPPONENT_MOVE_TIME);
    };

    const makePlayerMove = (row: number, col: number) => {
        if (!isBoardCellAvailable(board[row][col]) || currentMark !== playerMark || gameEnded) {
            return;
        }

        const newBoard = deepMatrixCopy(board);
        newBoard[row][col] = markToMarkSet[playerMark];

        updateForWinner(newBoard, true);
    };

    return (
        <>
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
                        <button className={GameScreenIconButtonCn} onClick={() => setQuitGameModalVisible(true)}>
                            <img src={leaveIcon} width={LEAVE_ICON_WIDTH} height={LEAVE_ICON_HEIGHT} />
                        </button>
                    </div>
                </header>
                <div className={GameScreenBoardCn}>
                    {board.map((rowValues, currentRow) =>
                        rowValues.map((_, currentCol) => {
                            return (
                                <div
                                    key={currentRow * board.length + currentCol}
                                    className={getGameScreenBoardCellCn(currentRow, currentCol)}
                                    onMouseMove={() => handleBoardCellMouseHover(currentRow, currentCol)}
                                    onMouseLeave={() => handleBoardCellMouseLeave()}
                                    onClick={() => makePlayerMove(currentRow, currentCol)}
                                />
                            );
                        })
                    )}
                </div>
                <footer className={GameScreenFooterCn}>
                    <div className={GameScreenStatsCn}>
                        {statsValues.map(([key, label, value]) => (
                            <div key={key} className={GameScreenStatsCellCn}>
                                <div>{label}</div>
                                <span className={GameScreenStatsCellCountCn}>{value}</span>
                            </div>
                        ))}
                    </div>
                    {playerMark !== currentMark && !gameEnded && (
                        <p className={GameScreenStatsOpponentLabelCn}>Your opponent is thinking...</p>
                    )}
                </footer>
            </div>
            {quitGameModalVisible && <QuitGameModal onModalClose={() => setQuitGameModalVisible(false)} />}
        </>
    );
};
