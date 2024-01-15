import { FC, useEffect, useRef, useState } from 'react';

import { Mark } from '../../App.const';
import { Logo } from '../../components';
import {
    GameScreenButtonContainerCn,
    GameScreenHeaderCn,
    GameScreenLogoCn,
    GameScreenIconButtonCn,
    GameScreenGameLabelCn,
    GameScreenBoardCn,
    GameScreenStatsCn,
    GameScreenStatsCellCn,
    GameScreenStatsCellCountCn,
    cnGameScreen,
    GameScreenFooterCn,
} from './GameScreen.cn';
import {
    LABEL_ICON_HEIGHT,
    LABEL_ICON_WIDTH,
    LEAVE_ICON_HEIGHT,
    LEAVE_ICON_WIDTH,
    RESTART_ICON_HEIGHT,
    RESTART_ICON_WIDTH,
    INITIAL_BOARD,
    BoardCellValue,
    Winner,
    markToHover,
    markToMarkSet,
    MarkState,
    MODAL_HIDING_TIME,
} from './GameScreen.const';
import { IGameScreenProps } from './GameScreen.typings';
import {
    deepMatrixCopy,
    determineWinner,
    getBoardCellMarkState,
    getNextMove,
    getUpdatedBoard,
    isBoardCellAvailable,
} from './GameScreen.helpers';
import { QuitGameModal } from './components/QuitGameModal';

import xOutline from '@assets/icons/x-outline.svg';
import oOutline from '@assets/icons/o-outline.svg';
import xGray from '@assets/icons/x-gray.svg';
import oGray from '@assets/icons/o-gray.svg';
import leaveIcon from '@assets/icons/leave.svg';
import restartIcon from '@assets/icons/restart.svg';
import { sound } from '@assets/sounds';
import './GameScreen.scss';

export const GameScreen: FC<IGameScreenProps> = ({ playerMark, difficulty, soundOn }) => {
    const computerMark = playerMark === Mark.X ? Mark.O : Mark.X;

    const [currentMark, setCurrentMark] = useState(Mark.X);
    const [board, setBoard] = useState(INITIAL_BOARD);
    const [gameWinner, setGameWinner] = useState<Winner | null>(null);

    const [quitGameModalVisible, setQuitGameModalVisible] = useState(false);
    const [quitGameModalHiding, setQuitGameModalHiding] = useState(false);

    const showModal = () => {
        if (soundOn) {
            sound.click.play();
        }

        document.body.classList.add('with-overlay');
        setQuitGameModalVisible(true);
    };

    const hideModal = () => {
        if (soundOn) {
            sound.click.play();
        }

        setQuitGameModalHiding(true);

        setTimeout(() => {
            document.body.classList.remove('with-overlay');
            setQuitGameModalHiding(false);
            setQuitGameModalVisible(false);
        }, MODAL_HIDING_TIME);
    };

    const GameScreenCn = cnGameScreen('', { withOverlay: quitGameModalVisible });

    const opponentTimeout = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        return () => clearTimeout(opponentTimeout.current);
    }, []);

    const [statsValues, setStatsValues] = useState<[Winner, number][]>([
        [Winner.O_MARK, 0],
        [Winner.TIE, 0],
        [Winner.X_MARK, 0],
    ]);

    const updateStats = (winner: Winner) => {
        const newStatsValues = [...statsValues];
        newStatsValues[statsValues.findIndex(([key, _]) => key === winner)][1]++;
        setStatsValues(newStatsValues);
    };

    const getStatsLabel = (key: Winner): string => {
        switch (key) {
            case Winner.X_MARK:
                return `X (${playerMark === Mark.X ? 'YOU' : 'CPU'})`;
            case Winner.O_MARK:
                return `O (${playerMark === Mark.O ? 'YOU' : 'CPU'})`;
            default:
                return 'Ties';
        }
    };

    const resetGame = () => {
        if (soundOn) {
            sound.click.play();
        }

        clearTimeout(opponentTimeout.current);
        setCurrentMark(Mark.X);
        setBoard(INITIAL_BOARD);
        setGameWinner(null);
    };

    useEffect(() => {
        if (!gameWinner && currentMark === computerMark) {
            makeComputerMove();
        }
    }, [gameWinner, currentMark]);

    const handleBoardCellMouseHover = (row: number, col: number) => {
        if (currentMark !== playerMark || gameWinner || board[row][col] !== BoardCellValue.EMPTY) {
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
        if (currentMark !== playerMark || gameWinner) {
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

    const updateForWinner = (board: BoardCellValue[][], nextMark: Mark) => {
        const winner = determineWinner(board);

        if (winner) {
            setGameWinner(winner);
            setBoard(getUpdatedBoard(board));
            updateStats(winner);
        } else {
            setBoard(board);
            setCurrentMark(nextMark);
        }
    };

    const makeComputerMove = () => {
        // 1000, 1100, ..., 1900, 2000
        const opponentMoveTime = Math.floor(Math.random() * 11) * 100 + 1000;

        opponentTimeout.current = setTimeout(() => {
            const move = getNextMove(board, computerMark, difficulty);

            if (move) {
                const computerMarkSet = playerMark === Mark.X ? BoardCellValue.O_MARK_SET : BoardCellValue.X_MARK_SET;
                const [row, col] = move;

                const newBoard = deepMatrixCopy(board);
                newBoard[row][col] = computerMarkSet;

                updateForWinner(newBoard, playerMark);
            }
        }, opponentMoveTime);
    };

    const makePlayerMove = (row: number, col: number) => {
        if (!isBoardCellAvailable(board[row][col]) || currentMark !== playerMark || gameWinner) {
            return;
        }

        if (soundOn) {
            sound.pop.play();
        }

        const newBoard = deepMatrixCopy(board);
        newBoard[row][col] = markToMarkSet[playerMark];

        updateForWinner(newBoard, computerMark);
    };

    const renderGameLabel = () => {
        return (
            <div className={GameScreenGameLabelCn}>
                {gameWinner === Winner.TIE ? (
                    'draw'
                ) : (
                    <>
                        <img
                            src={currentMark === Mark.X ? xGray : oGray}
                            width={LABEL_ICON_WIDTH}
                            height={LABEL_ICON_HEIGHT}
                        />
                        {gameWinner ? 'won!' : 'turn'}
                    </>
                )}
            </div>
        );
    };

    const renderBoardCell = (row: number, col: number) => {
        const [mark, markState] = getBoardCellMarkState(board, row, col);
        const className = cnGameScreen('BoardCellIcon', {
            xSet: mark === Mark.X && markState === MarkState.SET,
            oSet: mark === Mark.O && markState === MarkState.SET,
            winner: markState === MarkState.WINNER,
        });

        return (
            <button
                key={row * board.length + col}
                tabIndex={quitGameModalVisible ? -1 : 0}
                className={cnGameScreen('BoardCell', { hover: markState === MarkState.HOVER })}
                onMouseMove={() => handleBoardCellMouseHover(row, col)}
                onMouseLeave={() => handleBoardCellMouseLeave()}
                onClick={() => makePlayerMove(row, col)}
            >
                {mark === Mark.X ? (
                    markState === MarkState.HOVER ? (
                        <img className={className} src={xOutline} alt="X on hover" />
                    ) : markState ? (
                        <span className={className}>
                            <svg viewBox="0 0 64 64">
                                <path
                                    d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                                    fillRule="evenodd"
                                />
                            </svg>
                        </span>
                    ) : null
                ) : null}
                {mark === Mark.O ? (
                    markState === MarkState.HOVER ? (
                        <img className={className} src={oOutline} alt="O on hover" />
                    ) : markState ? (
                        <span className={className}>
                            <svg viewBox="0 0 64 64">
                                <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" />
                            </svg>
                        </span>
                    ) : null
                ) : null}
            </button>
        );
    };

    return (
        <>
            <div className={GameScreenCn}>
                <header className={GameScreenHeaderCn}>
                    <Logo className={GameScreenLogoCn} />
                    {renderGameLabel()}
                    <div className={GameScreenButtonContainerCn}>
                        <button
                            className={cnGameScreen('IconButton', {
                                flickering: !quitGameModalVisible && gameWinner !== null,
                            })}
                            tabIndex={quitGameModalVisible ? -1 : 0}
                            aria-label="Restart the game"
                            onClick={resetGame}
                        >
                            <img src={restartIcon} width={RESTART_ICON_WIDTH} height={RESTART_ICON_HEIGHT} />
                        </button>
                        <button
                            className={GameScreenIconButtonCn}
                            onClick={showModal}
                            tabIndex={quitGameModalVisible ? -1 : 0}
                            aria-label="Quit the game"
                        >
                            <img src={leaveIcon} width={LEAVE_ICON_WIDTH} height={LEAVE_ICON_HEIGHT} />
                        </button>
                    </div>
                </header>
                <div className={GameScreenBoardCn}>
                    {board.map((rowValues, row) => rowValues.map((_, col) => renderBoardCell(row, col)))}
                </div>
                <footer className={GameScreenFooterCn}>
                    <div className={GameScreenStatsCn}>
                        {statsValues.map(([key, value]) => (
                            <div key={key} className={GameScreenStatsCellCn}>
                                <div>{getStatsLabel(key)}</div>
                                <span className={GameScreenStatsCellCountCn}>{value}</span>
                            </div>
                        ))}
                    </div>
                    <p
                        className={cnGameScreen('OpponentLabel', {
                            visible: !gameWinner && currentMark === computerMark,
                        })}
                    >
                        Your opponent is thinking...
                    </p>
                </footer>
            </div>
            {quitGameModalVisible && (
                <QuitGameModal hiding={quitGameModalHiding} onModalClose={hideModal} soundOn={soundOn} />
            )}
        </>
    );
};
