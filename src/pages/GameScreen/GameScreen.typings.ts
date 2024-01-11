import { Mark } from '../../App.const';

export interface IGameScreenProps {
    /** player's mark */
    playerMark: Mark;
}

export type Move = [number, number] | null;
