import { Mark } from '../../App.typings';

export interface IMainScreenProps {
    /** player's mark */
    mark: Mark;
    /** sets player's initial mark */
    onPlayerMarkPick: (mark: Mark) => void;
}
