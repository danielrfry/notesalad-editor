import { useEffect, useState } from 'react';
import { useDebounce } from '../../../hooks/debounce';
import OPLEmulator from '../../../services/OPL/OPLEmulator';
import OPLEmulatorInputPort from '../../../services/OPL/OPLEmulatorInputPort';
import OPLEmulatorOutputPort from '../../../services/OPL/OPLEmulatorOutputPort';
import OPMEmulator from '../../../services/OPM/OPMEmulator';
import OPMEmulatorInputPort from '../../../services/OPM/OPMEmulatorInputPort';
import OPMEmulatorOutputPort from '../../../services/OPM/OPMEmulatorOutputPort';

const getDeviceListFromMIDIAccess = midiAccess => ({
    inputs: [...midiAccess.inputs.values()],
    outputs: [...midiAccess.outputs.values()],
});

const createEmulatedDevices = () => {
    const oplEmulator = new OPLEmulator();
    const oplInputPort = new OPLEmulatorInputPort(oplEmulator);
    const oplOutputPort = new OPLEmulatorOutputPort(oplEmulator);

    const opmEmulator = new OPMEmulator();
    const opmInputPort = new OPMEmulatorInputPort(opmEmulator);
    const opmOutputPort = new OPMEmulatorOutputPort(opmEmulator);

    return {
        inputs: [oplInputPort, opmInputPort],
        outputs: [oplOutputPort, opmOutputPort],
    };
};

const MIDIDeviceEnumerator = ({ setDeviceList }) => {
    const [midiAccess, setMIDIAccess] = useState();
    const [physicalDevices, setPhysicalDevices] = useState({
        inputs: [],
        outputs: [],
    });
    const [emulatedDevices, setEmulatedDevices] = useState({
        inputs: [],
        outputs: [],
    });

    const debouncedSetDeviceList = useDebounce(setDeviceList, 250);

    // Component mount/unmount effects
    useEffect(() => {
        setEmulatedDevices(createEmulatedDevices());
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess({ sysex: true }).then(setMIDIAccess);
        }
    }, []);

    // midiAccess change effects
    useEffect(() => {
        const updateDeviceList = () => {
            setPhysicalDevices(getDeviceListFromMIDIAccess(midiAccess));
        };

        if (midiAccess) {
            midiAccess.addEventListener('statechange', updateDeviceList);
            updateDeviceList();
            return () => {
                midiAccess.removeEventListener('statechange', updateDeviceList);
            };
        }
    }, [midiAccess]);

    // Device list change effects
    useEffect(() => {
        debouncedSetDeviceList &&
            debouncedSetDeviceList({
                inputs: [...emulatedDevices.inputs, ...physicalDevices.inputs],
                outputs: [
                    ...emulatedDevices.outputs,
                    ...physicalDevices.outputs,
                ],
            });
    }, [physicalDevices, emulatedDevices, debouncedSetDeviceList]);

    return null;
};

export default MIDIDeviceEnumerator;
