import { Difficulty, Mark } from '../../App.const';

export interface IMainScreenProps {
    /** player's mark */
    playerMark: Mark;
    /** sets the player's mark */
    onPlayerMarkPick: (mark: Mark) => void;
    /** game's difficulty */
    difficulty: Difficulty;
    /** sets the game's difficutly */
    onDifficultyPick: (difficulty: Difficulty) => void;
    /** whether the game has sounds */
    soundOn: boolean;
    /** turns on/off the game sounds */
    onSoundChange: () => void;
}
