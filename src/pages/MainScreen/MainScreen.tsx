import { FC } from 'react';
import { Link } from 'react-router-dom';

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
            <Link className={mainScreenNewGameButtonCn} to="/game">
                New Game
            </Link>
        </main>
    );
};
