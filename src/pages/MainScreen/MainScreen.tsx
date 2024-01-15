import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '../../components';
import { mainScreenCn, mainScreenNewGameButtonCn, mainScreenSoundButtonCn } from './MainScreen.cn';
import { Picker } from './components/Picker';
import { IMainScreenProps } from './MainScreen.typings';
import { SOUND_ICON_HEIGHT, SOUND_ICON_WIDTH } from './MainScreen.const';

import soundOffIcon from '@assets/icons/sound-off.svg';
import soundOnIcon from '@assets/icons/sound-on.svg';
import { sound } from '@assets/sounds';
import './MainScreen.scss';

export const MainScreen: FC<IMainScreenProps> = ({
    playerMark,
    onPlayerMarkPick,
    difficulty,
    onDifficultyPick,
    soundOn,
    onSoundChange,
}) => {
    const handleNewGameClick = () => {
        if (soundOn) {
            sound.click.play();
        }
    };

    return (
        <main className={mainScreenCn}>
            <div>
                <Logo />
                <button
                    className={mainScreenSoundButtonCn}
                    aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}
                    onClick={onSoundChange}
                >
                    <img
                        src={soundOn ? soundOnIcon : soundOffIcon}
                        alt={soundOn ? 'sound is on' : 'sound is off'}
                        width={SOUND_ICON_WIDTH}
                        height={SOUND_ICON_HEIGHT}
                    />
                </button>
            </div>
            <Picker
                playerMark={playerMark}
                onPlayerMarkPick={onPlayerMarkPick}
                difficulty={difficulty}
                onDifficultyPick={onDifficultyPick}
            />
            <Link className={mainScreenNewGameButtonCn} onClick={handleNewGameClick} to="/game">
                New Game
            </Link>
        </main>
    );
};
