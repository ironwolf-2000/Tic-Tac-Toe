import { Difficulty, Mark } from '../../App.const';

export interface IMainScreenProps {
    /** player's mark */
    playerMark: Mark;
    /** game's difficulty */
    difficulty: Difficulty;
    /** sets the player's mark */
    onPlayerMarkPick: (mark: Mark) => void;
    /** sets the game's difficutly */
    onDifficultyPick: (difficulty: Difficulty) => void;
}
