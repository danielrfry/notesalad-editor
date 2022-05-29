import MIDIInputService from './MIDIInputService';

const MAUDIO_OXYGEN_CTL_MAP = {
    74: 'slider1',
    71: 'slider2',
    91: 'slider3',
    93: 'slider4',
    73: 'slider5',
    72: 'slider6',
    5: 'slider7',
    84: 'slider8',
    7: 'slider9',
    75: 'knob1',
    76: 'knob2',
    92: 'knob3',
    95: 'knob4',
    10: 'knob5',
    77: 'knob6',
    78: 'knob7',
    79: 'knob8',
};

const KORG_NANOKONTROL2_CTL_MAP = {
    0: 'slider1',
    1: 'slider2',
    2: 'slider3',
    3: 'slider4',
    4: 'slider5',
    5: 'slider6',
    6: 'slider7',
    7: 'slider8',
    16: 'knob1',
    17: 'knob2',
    18: 'knob3',
    19: 'knob4',
    20: 'knob5',
    21: 'knob6',
    22: 'knob7',
    23: 'knob8',
    32: 'button1a',
    48: 'button1b',
    64: 'button1c',
    33: 'button2a',
    49: 'button2b',
    65: 'button2c',
    34: 'button3a',
    50: 'button3b',
    66: 'button3c',
    35: 'button4a',
    51: 'button4b',
    67: 'button4c',
    36: 'button5a',
    52: 'button5b',
    68: 'button5c',
    37: 'button6a',
    53: 'button6b',
    69: 'button6c',
    38: 'button7a',
    54: 'button7b',
    70: 'button7c',
    39: 'button8a',
    55: 'button8b',
    71: 'button8c',
};

const INPUT_SERVICE_FACTORIES = {
    'nanoKONTROL2 SLIDER/KNOB': () =>
        new MIDIInputService(KORG_NANOKONTROL2_CTL_MAP),
    'Oxygen 49': () => new MIDIInputService(MAUDIO_OXYGEN_CTL_MAP),
};

export const isSupportedControlDevice = port =>
    port.name in INPUT_SERVICE_FACTORIES;

export const createInputService = device => {
    if (isSupportedControlDevice(device)) {
        return INPUT_SERVICE_FACTORIES[device.name]();
    } else {
        return new MIDIInputService();
    }
};
