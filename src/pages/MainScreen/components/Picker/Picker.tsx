import { FC } from 'react';

import { PickerTitleCn, PickerFooterTextCn, PickerCn, cnPicker, PickerSwitchCn } from './Picker.cn';
import { IPickerProps } from './Picker.typings';
import { ICON_HEIGHT, ICON_WIDTH } from './Picker.const';

import oBlack from '@assets/icons/o-black.svg';
import oGray from '@assets/icons/o-gray.svg';
import xBlack from '@assets/icons/x-black.svg';
import xGray from '@assets/icons/x-gray.svg';
import './Picker.scss';

export const Picker: FC<IPickerProps> = ({ mark, onPlayerMarkPick }) => {
    const xSrc = mark === 'xMark' ? xBlack : xGray;
    const oSrc = mark === 'oMark' ? oBlack : oGray;

    return (
        <section className={PickerCn}>
            <header className={PickerTitleCn}>Pick player 1’s mark</header>
            <div className={PickerSwitchCn}>
                <button
                    className={cnPicker('SwitchItem', { selected: mark === 'xMark' })}
                    onClick={() => onPlayerMarkPick('xMark')}
                >
                    <img src={xSrc} width={ICON_WIDTH} height={ICON_HEIGHT} />
                </button>
                <button
                    className={cnPicker('SwitchItem', { selected: mark === 'oMark' })}
                    onClick={() => onPlayerMarkPick('oMark')}
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
