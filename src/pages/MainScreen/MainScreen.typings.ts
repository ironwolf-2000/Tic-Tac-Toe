import { Mark } from '../../App.const';

export interface IMainScreenProps {
    /** player's mark */
    mark: Mark;
    /** sets player's initial mark */
    onPlayerMarkPick: (mark: Mark) => void;
}
