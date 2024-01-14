import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { GameScreen, MainScreen } from './pages';
import { Difficulty, Mark } from './App.const';

import { sound } from '@assets/sounds';
import './App.scss';

export const App = ({}) => {
    const [soundOn, setSoundOn] = useState(true);
    const [playerMark, setPlayerMark] = useState<Mark>(Mark.X);
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);

    const callWithSound = (func: Function, args: unknown, audio: HTMLAudioElement) => {
        if (soundOn) {
            audio.play();
        }

        func(args);
    };

    const commonProps = { playerMark, difficulty, soundOn };

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <MainScreen
                    {...commonProps}
                    onPlayerMarkPick={(val) => callWithSound(setPlayerMark, val, sound.switch)}
                    onDifficultyPick={(val) => callWithSound(setDifficulty, val, sound.switch)}
                    onSoundChange={() => callWithSound(setSoundOn, !soundOn, sound.click)}
                />
            ),
        },
        {
            path: '/game',
            element: <GameScreen {...commonProps} />,
        },
    ]);

    return <RouterProvider router={router} />;
};
