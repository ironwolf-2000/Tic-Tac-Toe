import { FC } from 'react';

import { Logo } from '../../components';
import {
    GameScreenButtonContainerCn,
    GameScreenCn,
    GameScreenHeaderCn,
    GameScreenLogoCn,
    GameScreenIconButtonCn,
    GameScreenLabelTurnCn,
    GameScreenBoardCn,
    GameScreenBoardCellCn,
    GameScreenStatsCn,
    GameScreenStatsCellCn,
    GameScreenStatsCellCountCn,
} from './GameScreen.cn';
import {
    LABEL_ICON_HEIGHT,
    LABEL_ICON_WIDTH,
    LEAVE_ICON_HEIGHT,
    LEAVE_ICON_WIDTH,
    RESTART_ICON_HEIGHT,
    RESTART_ICON_WIDTH,
} from './GameScreen.const';
import { IGameScreenProps } from './GameScreen.typings';

import oGray from '@assets/icons/o-gray.svg';
import xGray from '@assets/icons/x-gray.svg';
import leaveIcon from '@assets/icons/leave.svg';
import restartIcon from '@assets/icons/restart.svg';
import './GameScreen.scss';

export const GameScreen: FC<IGameScreenProps> = ({ mark }) => {
    return (
        <div className={GameScreenCn}>
            <header className={GameScreenHeaderCn}>
                <Logo className={GameScreenLogoCn} />
                <div className={GameScreenLabelTurnCn}>
                    <img src={mark === 'xMark' ? xGray : oGray} width={LABEL_ICON_WIDTH} height={LABEL_ICON_HEIGHT} />
                    &nbsp;turn
                </div>
                <div className={GameScreenButtonContainerCn}>
                    <button className={GameScreenIconButtonCn}>
                        <img src={restartIcon} width={RESTART_ICON_WIDTH} height={RESTART_ICON_HEIGHT} />
                    </button>
                    <button className={GameScreenIconButtonCn}>
                        <img src={leaveIcon} width={LEAVE_ICON_WIDTH} height={LEAVE_ICON_HEIGHT} />
                    </button>
                </div>
            </header>
            <div className={GameScreenBoardCn}>
                <div className={GameScreenBoardCellCn}></div>
                <div className={GameScreenBoardCellCn}></div>
                <div className={GameScreenBoardCellCn}></div>
                <div className={GameScreenBoardCellCn}></div>
                <div className={GameScreenBoardCellCn}></div>
                <div className={GameScreenBoardCellCn}></div>
                <div className={GameScreenBoardCellCn}></div>
                <div className={GameScreenBoardCellCn}></div>
                <div className={GameScreenBoardCellCn}></div>
            </div>
            <footer className={GameScreenStatsCn}>
                <div className={GameScreenStatsCellCn}>
                    <div>"O" wins</div>
                    <span className={GameScreenStatsCellCountCn}>1</span>
                </div>
                <div className={GameScreenStatsCellCn}>
                    <div>Ties</div>
                    <span className={GameScreenStatsCellCountCn}>2</span>
                </div>
                <div className={GameScreenStatsCellCn}>
                    <div>"X" wins</div>
                    <span className={GameScreenStatsCellCountCn}>3</span>
                </div>
            </footer>
        </div>
    );
};
