import { useContext, useEffect } from 'react';
import { useStore } from 'react-redux';
import DevTools from '../../services/DevTools';
import { MIDIOutputServiceContext } from '../MIDI/MIDIOutputServiceProvider/MIDIOutputServiceProvider';

const ConsoleDevTools = () => {
    const outputService = useContext(MIDIOutputServiceContext);
    const store = useStore();

    useEffect(() => {
        window.ntsld = new DevTools(store, outputService);
    }, [outputService, store]);

    return null;
};

export default ConsoleDevTools;
