import { Mark } from '../../../../App.typings';

export interface IPickerProps {
    /** player's mark */
    mark: Mark;
    /** sets player's initial mark */
    onPlayerMarkPick: (mark: Mark) => void;
}
