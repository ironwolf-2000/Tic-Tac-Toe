import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuitGameModalButtonWrapperCn, QuitGameModalTitleCn, cnQuitGameModal } from './QuitGameModal.cn';
import { IQuitGameModalProps } from './QuitGameModal.typings';

import { sound } from '@assets/sounds';
import './QuitGameModal.scss';

export const QuitGameModal: FC<IQuitGameModalProps> = ({ hiding, onModalClose, soundOn }) => {
    const navigate = useNavigate();

    const redirectHome = () => {
        if (soundOn) {
            sound.click.play();
        }

        document.body.classList.remove('with-overlay');
        navigate('/', { replace: true });
    };

    return (
        <div className={cnQuitGameModal('', { hiding })}>
            <p className={QuitGameModalTitleCn}>Quit the game</p>
            <div className={QuitGameModalButtonWrapperCn}>
                <button className={cnQuitGameModal('Button', { cancel: true })} onClick={onModalClose}>
                    No, cancel
                </button>
                <button className={cnQuitGameModal('Button', { confirm: true })} onClick={redirectHome}>
                    Yes, quit
                </button>
            </div>
        </div>
    );
};
