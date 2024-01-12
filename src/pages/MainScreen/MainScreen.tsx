import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '../../components';
import { mainScreenCn, mainScreenNewGameButtonCn } from './MainScreen.cn';
import { Picker } from './components/Picker';
import { IMainScreenProps } from './MainScreen.typings';

import './MainScreen.scss';

export const MainScreen: FC<IMainScreenProps> = ({ playerMark, difficulty, onPlayerMarkPick, onDifficultyPick }) => {
    return (
        <main className={mainScreenCn}>
            <Logo />
            <Picker
                playerMark={playerMark}
                onPlayerMarkPick={onPlayerMarkPick}
                difficulty={difficulty}
                onDifficultyPick={onDifficultyPick}
            />
            <Link className={mainScreenNewGameButtonCn} to="/game">
                New Game
            </Link>
        </main>
    );
};
