import { Modes } from '../types';
import { isSupportedControlDevice } from './ControlDevices';

export const DEVICE_ID_NONE = 'uk.danfry.None';
export const DEVICE_ID_AUTO = 'uk.danfry.Auto';

export const DEVICE_NAME_AUTO = '(Auto)';
export const DEVICE_NAME_NONE = '(None)';

const SUPPORTED_SYNTH_DEVICE_NAMES = {
    [Modes.OPL]: ['YMF262 Player', 'YM3812 Player'],
    [Modes.OPM]: ['YM2151 Player'],
    [Modes.SD1]: ['YMF825 Player'],
};

const selectDefaultSynthPort = (devices, mode) => {
    let selected = undefined;

    // Look for a supported hardware device
    selected = devices.find(
        dev =>
            !dev.isEmulator &&
            SUPPORTED_SYNTH_DEVICE_NAMES[mode].includes(dev.name)
    );
    if (selected) return selected;

    // Look for an emulator
    selected = devices.find(dev => dev.isEmulator && dev.deviceMode === mode);
    if (selected) return selected;

    return undefined;
};

const selectDefaultControlPort = (devices, excludeDevs = []) => {
    // Use the first device that isn't an emulator, preferring supported devices
    const allowedDevs = devices.filter(
        dev => !excludeDevs.includes(dev) && !dev.isEmulator
    );
    return (
        allowedDevs.find(dev => isSupportedControlDevice(dev)) || allowedDevs[0]
    );
};

const selectPort = (devices, preferredDeviceInfo, fallbackDevice) => {
    if (preferredDeviceInfo?.id === DEVICE_ID_NONE) {
        return undefined;
    } else if (preferredDeviceInfo?.id === DEVICE_ID_AUTO) {
        return fallbackDevice;
    } else {
        return (
            devices.find(dev => dev.id === preferredDeviceInfo.id) ||
            devices.find(dev => dev.name === preferredDeviceInfo.name) ||
            fallbackDevice
        );
    }
};

export const getDefaultMIDIDevices = (allDevices, mode) => {
    const synthInputPort = selectDefaultSynthPort(allDevices.inputs, mode);
    const synthOutputPort = selectDefaultSynthPort(allDevices.outputs, mode);
    const controlInputPort = selectDefaultControlPort(allDevices.inputs, [
        synthInputPort,
    ]);
    return { synthInputPort, synthOutputPort, controlInputPort };
};

export const selectMIDIDevices = (allDevices, mode, preferredDevices) => {
    const defaults = getDefaultMIDIDevices(allDevices, mode);

    const synthInputPort = selectPort(
        allDevices.inputs,
        preferredDevices?.[mode].synthInput,
        defaults.synthInputPort
    );
    const synthOutputPort = selectPort(
        allDevices.outputs,
        preferredDevices?.[mode].synthOutput,
        defaults.synthOutputPort
    );
    const controlInputPort = selectPort(
        allDevices.inputs,
        preferredDevices?.[mode].controlInput,
        defaults.controlInputPort
    );

    return {
        synthInputPort,
        synthOutputPort,
        controlInputPort,
    };
};
