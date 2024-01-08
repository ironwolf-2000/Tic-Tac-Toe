import { Mark } from '../../App.const';
import { BoardCellValue } from './GameScreen.const';

export interface IGameScreenProps {
    /** player's mark */
    playerMark: Mark;
}

export type Winner = BoardCellValue.X_MARK_WINNER | BoardCellValue.O_MARK_WINNER | 'tie';
