import { useContext, useEffect } from 'react';
import { MIDIOutputServiceContext } from '../MIDIOutputServiceProvider/MIDIOutputServiceProvider';

const Note = ({ noteNum }) => {
    const outputService = useContext(MIDIOutputServiceContext);

    useEffect(() => {
        outputService.noteOn(noteNum);

        return () => outputService.noteOff(noteNum);
    }, [noteNum, outputService]);

    return null;
};

export default Note;
