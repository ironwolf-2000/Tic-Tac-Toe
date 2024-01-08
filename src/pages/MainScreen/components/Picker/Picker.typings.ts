import { Mark } from '../../../../App.const';

export interface IPickerProps {
    /** player's mark */
    playerMark: Mark;
    /** sets player's initial mark */
    onPlayerMarkPick: (mark: Mark) => void;
}
