import { useState } from 'react';

import { MainScreen } from './pages/MainScreen';
import { Mark } from './App.typings';

import './App.scss';

export const App = ({}) => {
    const [mark, setMark] = useState<Mark>('xMark');

    const handlePlayerMarkPick = (newMark: Mark) => {
        if (newMark !== mark) {
            setMark(newMark);
        }
    };

    return <MainScreen mark={mark} onPlayerMarkPick={handlePlayerMarkPick} />;
};
