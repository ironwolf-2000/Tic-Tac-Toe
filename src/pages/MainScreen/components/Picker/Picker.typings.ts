import { Difficulty, Mark } from '../../../../App.const';

export interface IPickerProps {
    /** player's mark */
    playerMark: Mark;
    /** sets the player's mark */
    onPlayerMarkPick: (mark: Mark) => void;
    /** game's difficulty */
    difficulty: Difficulty;
    /** sets the game's difficutly */
    onDifficultyPick: (difficulty: Difficulty) => void;
}
