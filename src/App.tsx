import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { GameScreen, MainScreen } from './pages';
import { Difficulty, Mark } from './App.const';

import './App.scss';

export const App = ({}) => {
    const [playerMark, setPlayerMark] = useState<Mark>(Mark.X);
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <MainScreen
                    playerMark={playerMark}
                    onPlayerMarkPick={setPlayerMark}
                    difficulty={difficulty}
                    onDifficultyPick={setDifficulty}
                />
            ),
        },
        {
            path: '/game',
            element: <GameScreen playerMark={playerMark} difficulty={difficulty} />,
        },
    ]);

    return <RouterProvider router={router} />;
};
