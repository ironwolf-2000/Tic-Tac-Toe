import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { GameScreen, MainScreen } from './pages';
import { Mark } from './App.const';

import './App.scss';

export const App = ({}) => {
    const [playerMark, setPlayerMark] = useState<Mark>(Mark.X);

    const handlePlayerMarkPick = (mark: Mark) => {
        if (mark !== playerMark) {
            setPlayerMark(mark);
        }
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: <MainScreen playerMark={playerMark} onPlayerMarkPick={handlePlayerMarkPick} />,
        },
        {
            path: '/game',
            element: <GameScreen playerMark={playerMark} />,
        },
    ]);

    return <RouterProvider router={router} />;
};
