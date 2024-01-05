import { FC } from 'react';

import { mainScreenCn, mainScreenLogoCn, mainScreenNewGameButtonCn } from './MainScreen.cn';
import { LOGO_ICON_HEIGHT, LOGO_ICON_WIDTH } from './MainScreen.const';
import { Picker } from './components/Picker';
import { IMainScreenProps } from './MainScreen.typings';

import xIcon from '@assets/icons/x.svg';
import oIcon from '@assets/icons/o.svg';
import './MainScreen.scss';

export const MainScreen: FC<IMainScreenProps> = ({ mark, onPlayerMarkPick }) => {
    return (
        <main className={mainScreenCn}>
            <div className={mainScreenLogoCn}>
                <img src={xIcon} width={LOGO_ICON_WIDTH} height={LOGO_ICON_HEIGHT} />
                <img src={oIcon} width={LOGO_ICON_WIDTH} height={LOGO_ICON_HEIGHT} />
            </div>
            <Picker mark={mark} onPlayerMarkPick={onPlayerMarkPick} />
            <button className={mainScreenNewGameButtonCn}>New Game</button>
        </main>
    );
};
