import { useContext, useEffect } from 'react';
import { useStore } from 'react-redux';
import DevTools from '../../../services/DevTools';
import { MIDIOutputServiceContext } from '../MIDIOutputServiceProvider/MIDIOutputServiceProvider';

const MIDIDevTools = () => {
    const outputService = useContext(MIDIOutputServiceContext);
    const store = useStore();

    useEffect(() => {
        window.midi = new DevTools(store, outputService);
    }, [store, outputService]);

    return null;
};

export default MIDIDevTools;
