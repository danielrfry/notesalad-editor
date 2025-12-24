import { useEffect, useState, useCallback, useRef } from 'react';
import { useDebounce } from '../../../hooks/debounce';
import OPLEmulator from '../../../services/OPL/OPLEmulator';
import OPLEmulatorInputPort from '../../../services/OPL/OPLEmulatorInputPort';
import OPLEmulatorOutputPort from '../../../services/OPL/OPLEmulatorOutputPort';
import OPMEmulator from '../../../services/OPM/OPMEmulator';
import OPMEmulatorInputPort from '../../../services/OPM/OPMEmulatorInputPort';
import OPMEmulatorOutputPort from '../../../services/OPM/OPMEmulatorOutputPort';
import _ from 'lodash';

const getDeviceListFromMIDIAccess = (midiAccess) => [
    ...midiAccess.inputs.values(),
    ...midiAccess.outputs.values(),
];

const createEmulatedDevices = () => {
    const oplEmulator = new OPLEmulator();
    const oplInputPort = new OPLEmulatorInputPort(oplEmulator);
    const oplOutputPort = new OPLEmulatorOutputPort(oplEmulator);

    const opmEmulator = new OPMEmulator();
    const opmInputPort = new OPMEmulatorInputPort(opmEmulator);
    const opmOutputPort = new OPMEmulatorOutputPort(opmEmulator);

    return [oplInputPort, opmInputPort, oplOutputPort, opmOutputPort];
};

const MIDIDeviceEnumerator = ({ setDeviceList }) => {
    const [midiAccess, setMIDIAccess] = useState();
    const emulatedDevices = useRef(createEmulatedDevices());
    const physicalDevices = useRef([]);

    const debouncedSetDeviceList = useDebounce(setDeviceList, 250);

    const updateDeviceList = useCallback(() => {
        const allDevices = [
            ...emulatedDevices.current,
            ...physicalDevices.current,
        ];
        debouncedSetDeviceList({
            inputs: allDevices.filter((d) => d.type === 'input'),
            outputs: allDevices.filter((d) => d.type === 'output'),
        });
    }, [debouncedSetDeviceList]);

    // Component mount/unmount effects
    useEffect(() => {
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess({ sysex: true }).then(setMIDIAccess);
        }
        updateDeviceList();
    }, [updateDeviceList]);

    // midiAccess change effects
    useEffect(() => {
        const updatePhysicalDeviceList = () => {
            const oldDeviceIDs = _.sortBy(
                _.map(physicalDevices.current, (d) => d.id)
            );
            const newDevices = getDeviceListFromMIDIAccess(midiAccess);
            const newDeviceIDs = _.sortBy(_.map(newDevices, (d) => d.id));
            if (!_.isEqual(oldDeviceIDs, newDeviceIDs)) {
                physicalDevices.current = newDevices;
                updateDeviceList();
            }
            physicalDevices.current = newDevices;
        };

        if (midiAccess) {
            midiAccess.addEventListener(
                'statechange',
                updatePhysicalDeviceList
            );
            updatePhysicalDeviceList();
            return () => {
                midiAccess.removeEventListener(
                    'statechange',
                    updatePhysicalDeviceList
                );
            };
        }
    }, [midiAccess]);

    return null;
};

export default MIDIDeviceEnumerator;
