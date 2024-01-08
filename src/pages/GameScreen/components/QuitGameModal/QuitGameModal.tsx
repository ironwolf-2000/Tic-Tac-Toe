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

export const QuitGameModal: FC<IQuitGameModalProps> = ({ onModalClose }) => {
    const navigate = useNavigate();

    return (
        <div className={QuitGameModalCn}>
            <p className={QuitGameModalTitleCn}>Quit the game</p>
            <div className={QuitGameModalButtonWrapperCn}>
                <button className={cnQuitGameModal('Button', { cancel: true })} onClick={onModalClose}>
                    No, cancel
                </button>
                <button
                    className={cnQuitGameModal('Button', { confirm: true })}
                    onClick={() => navigate('/', { replace: true })}
                >
                    Yes, quit
                </button>
            </div>
        </div>
    );
};
