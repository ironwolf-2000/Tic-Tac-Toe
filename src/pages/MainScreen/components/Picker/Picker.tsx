import { FC } from 'react';

import {
    cnPicker,
    PickerCn,
    PickerSectionCn,
    PickerSectionTitleCn,
    PickerSwitchWrapperCn,
    PickerPlayerSwitchItemCn,
    PickerFooterTextCn,
} from './Picker.cn';
import { IPickerProps } from './Picker.typings';
import { DIFFICULTIES, ICON_HEIGHT, ICON_WIDTH } from './Picker.const';
import { Difficulty, Mark } from '../../../../App.const';

import oBlack from '@assets/icons/o-black.svg';
import oGray from '@assets/icons/o-gray.svg';
import xBlack from '@assets/icons/x-black.svg';
import xGray from '@assets/icons/x-gray.svg';
import './Picker.scss';

export const Picker: FC<IPickerProps> = ({ playerMark, difficulty, onPlayerMarkPick, onDifficultyPick }) => {
    const PickerPlayerSwitchCn = cnPicker('PlayerSwitch', { oMark: playerMark === Mark.O });
    const PickerDifficultySwitchCn = cnPicker('DifficultySwitch', {
        medium: difficulty === Difficulty.MEDIUM,
        hard: difficulty === Difficulty.HARD,
    });

    const xSrc = playerMark === Mark.X ? xBlack : xGray;
    const oSrc = playerMark === Mark.O ? oBlack : oGray;

    return (
        <div className={PickerCn}>
            <section className={PickerSectionCn}>
                <header className={PickerSectionTitleCn}>Player mark</header>
                <div className={PickerSwitchWrapperCn}>
                    <div className={PickerPlayerSwitchCn}>
                        <span className={PickerPlayerSwitchItemCn} onClick={() => onPlayerMarkPick(Mark.X)}>
                            <img src={xSrc} width={ICON_WIDTH} height={ICON_HEIGHT} />
                        </span>
                        <span className={PickerPlayerSwitchItemCn} onClick={() => onPlayerMarkPick(Mark.O)}>
                            <img src={oSrc} width={ICON_WIDTH} height={ICON_HEIGHT} />
                        </span>
                    </div>
                </div>
            </section>
            <section className={PickerSectionCn}>
                <header className={PickerSectionTitleCn}>Difficulty</header>
                <div className={PickerSwitchWrapperCn}>
                    <div className={PickerDifficultySwitchCn}>
                        {DIFFICULTIES.map(({ key, label }) => (
                            <span
                                key={key}
                                className={cnPicker('DifficultySwitchItem', { current: key === difficulty })}
                                onClick={() => onDifficultyPick(key)}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
            <div>
                <span className={PickerFooterTextCn}>Remember: X goes first</span>
            </div>
        </div>
    );
};
