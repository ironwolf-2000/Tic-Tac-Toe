import clickSound from './click.wav';
import popSound from './pop.wav';
import switchSound from './switch.wav';

const getAudio = (src: string, volume = 0.5) => {
    const audio = new Audio(src);
    audio.volume = volume;

    return audio;
};

export const sound = {
    click: getAudio(clickSound),
    pop: getAudio(popSound, 0.75),
    switch: getAudio(switchSound),
};
