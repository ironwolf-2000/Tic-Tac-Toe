export interface IQuitGameModalProps {
    /** indicates whether the modal is in a hiding state */
    hiding: boolean;
    /** closes the modal */
    onModalClose: () => void;
    /** whether the game has sounds */
    soundOn: boolean;
}
