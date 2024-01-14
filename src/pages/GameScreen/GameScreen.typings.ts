import { Difficulty, Mark } from '../../App.const';

export interface IGameScreenProps {
    /** player's mark */
    playerMark: Mark;
    /** game's difficulty */
    difficulty: Difficulty;
    /** whether the game has sounds */
    soundOn: boolean;
}

export type Move = [number, number] | null;
