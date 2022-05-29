import AsyncLock from 'async-lock/lib';
import { useContext, useEffect, useState } from 'react';
import {
    formatWritePatchMessage,
    getChannelAddress,
    getDrumPatchAddress,
    getMelodicPatchAddress,
} from '../sysex';
import { PatchAddressTypes } from '../types';
import { MIDIOutputServiceContext } from '../components/MIDI/MIDIOutputServiceProvider/MIDIOutputServiceProvider';

const lock = new AsyncLock();

const convertDestinationAddress = destinationAddress => {
    switch (destinationAddress.type) {
        case PatchAddressTypes.Channel:
            return getChannelAddress(destinationAddress.channel);
        case PatchAddressTypes.MelodicProgram: {
            const { bank, program } = destinationAddress.melodicProgram;
            return getMelodicPatchAddress(bank, program);
        }
        case PatchAddressTypes.DrumProgram: {
            const { bank, program, noteNum } = destinationAddress.drumProgram;
            return getDrumPatchAddress(bank, program, noteNum);
        }
        default:
            throw new TypeError('Unknown address type');
    }
};

const getSysExData = async (destinationAddress, midiOutput) =>
    await lock.acquire('sysex', async () => {
        try {
            const patch = await midiOutput.readPatch(getChannelAddress(0));
            return formatWritePatchMessage(
                convertDestinationAddress(destinationAddress),
                patch.deviceID,
                patch.patchData
            );
        } catch (e) {
            console.warn('Error reading patch data:', e);
        }
    });

const useSysExData = destinationAddress => {
    const [data, setData] = useState();
    const midiOutput = useContext(MIDIOutputServiceContext);

    useEffect(() => {
        let cancelled = false;

        setData(undefined);

        if (destinationAddress && midiOutput) {
            (async () => {
                const sysExData = await getSysExData(
                    destinationAddress,
                    midiOutput
                );
                if (!cancelled) setData(sysExData);
            })();
        }

        return () => (cancelled = true);
    }, [destinationAddress, midiOutput]);

    return data;
};

export default useSysExData;
