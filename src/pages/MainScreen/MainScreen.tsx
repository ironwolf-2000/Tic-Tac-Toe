import { FC } from 'react';

import { Logo } from '../../components';
import { mainScreenCn, mainScreenNewGameButtonCn } from './MainScreen.cn';
import { Picker } from './components/Picker';
import { IMainScreenProps } from './MainScreen.typings';

import './MainScreen.scss';

export const MainScreen: FC<IMainScreenProps> = ({ mark, onPlayerMarkPick }) => {
    return (
        <main className={mainScreenCn}>
            <Logo />
            <Picker mark={mark} onPlayerMarkPick={onPlayerMarkPick} />
            <button className={mainScreenNewGameButtonCn}>New Game</button>
        </main>
    );
};
