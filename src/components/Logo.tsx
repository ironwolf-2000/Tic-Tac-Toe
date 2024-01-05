import { LOGO_ICON_HEIGHT, LOGO_ICON_WIDTH } from './Logo.const';
import { LogoCn } from './Logo.cn';

import xIcon from '@assets/icons/x.svg';
import oIcon from '@assets/icons/o.svg';
import './Logo.scss';

export const Logo = () => {
    return (
        <div className={LogoCn}>
            <img src={xIcon} width={LOGO_ICON_WIDTH} height={LOGO_ICON_HEIGHT} />
            <img src={oIcon} width={LOGO_ICON_WIDTH} height={LOGO_ICON_HEIGHT} />
        </div>
    );
};
