import { FC } from 'react';

import { PickerTitleCn, PickerFooterTextCn, PickerCn, cnPicker, PickerSwitchCn } from './Picker.cn';
import { IPickerProps } from './Picker.typings';
import { ICON_HEIGHT, ICON_WIDTH } from './Picker.const';
import { Mark } from '../../../../App.const';

import oBlack from '@assets/icons/o-black.svg';
import oGray from '@assets/icons/o-gray.svg';
import xBlack from '@assets/icons/x-black.svg';
import xGray from '@assets/icons/x-gray.svg';
import './Picker.scss';

export const Picker: FC<IPickerProps> = ({ mark, onPlayerMarkPick }) => {
    const xSrc = mark === Mark.X ? xBlack : xGray;
    const oSrc = mark === Mark.O ? oBlack : oGray;

    return (
        <section className={PickerCn}>
            <header className={PickerTitleCn}>Pick player 1’s mark</header>
            <div className={PickerSwitchCn}>
                <button
                    className={cnPicker('SwitchItem', { selected: mark === Mark.X })}
                    onClick={() => onPlayerMarkPick(Mark.X)}
                >
                    <img src={xSrc} width={ICON_WIDTH} height={ICON_HEIGHT} />
                </button>
                <button
                    className={cnPicker('SwitchItem', { selected: mark === Mark.O })}
                    onClick={() => onPlayerMarkPick(Mark.O)}
                >
                    <img src={oSrc} width={ICON_WIDTH} height={ICON_HEIGHT} />
                </button>
            </div>
            <footer>
                <span className={PickerFooterTextCn}>Remember: X goes first</span>
            </footer>
        </section>
    );
};
