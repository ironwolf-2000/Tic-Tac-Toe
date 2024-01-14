import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    QuitGameModalButtonWrapperCn,
    QuitGameModalCn,
    QuitGameModalTitleCn,
    cnQuitGameModal,
} from './QuitGameModal.cn';
import { IQuitGameModalProps } from './QuitGameModal.typings';

import './QuitGameModal.scss';

export const QuitGameModal: FC<IQuitGameModalProps> = ({ hiding, onModalClose }) => {
    const navigate = useNavigate();

    const redirectHome = () => {
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
