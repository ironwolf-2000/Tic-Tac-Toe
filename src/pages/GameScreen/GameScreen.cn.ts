import { cn } from '@bem-react/classname';

const cnGameScreen = cn('GameScreen');

export const GameScreenCn = cnGameScreen();

// HEADER
export const GameScreenHeaderCn = cnGameScreen('Header');
export const GameScreenLogoCn = cnGameScreen('Logo');
export const GameScreenLabelTurnCn = cnGameScreen('LabelTurn');
export const GameScreenButtonContainerCn = cnGameScreen('ButtonContainer');
export const GameScreenIconButtonCn = cnGameScreen('IconButton');

// BOARD
export const GameScreenBoardCn = cnGameScreen('Board');
export const GameScreenBoardCellCn = cnGameScreen('BoardCell');

// FOOTER
export const GameScreenStatsCn = cnGameScreen('Stats');
export const GameScreenStatsCellCn = cnGameScreen('StatsCell');
export const GameScreenStatsCellCountCn = cnGameScreen('StatsCellCount');
