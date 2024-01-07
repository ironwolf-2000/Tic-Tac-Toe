import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { GameScreen, MainScreen } from './pages';
import { Mark } from './App.typings';

import './App.scss';

export const App = ({}) => {
    const [mark, setMark] = useState<Mark>('xMark');

    const handlePlayerMarkPick = (newMark: Mark) => {
        if (newMark !== mark) {
            setMark(newMark);
        }
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: <MainScreen mark={mark} onPlayerMarkPick={handlePlayerMarkPick} />,
        },
        {
            path: '/game',
            element: <GameScreen mark={mark} />,
        },
    ]);

    return <RouterProvider router={router} />;
};
