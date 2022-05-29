import 'audioworklet-polyfill';

export const createAudioContext = (...args) => {
    if (window.AudioContext) {
        return new window.AudioContext(...args);
    } else if (window.webkitAudioContext) {
        return new window.webkitAudioContext(...args);
    }
};
