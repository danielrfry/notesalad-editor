import { useEffect, useRef } from 'react';
import _ from 'lodash';

const keyNoteMap = {
    KeyA: 0,
    KeyW: 1,
    KeyS: 2,
    KeyE: 3,
    KeyD: 4,
    KeyF: 5,
    KeyT: 6,
    KeyG: 7,
    KeyY: 8,
    KeyH: 9,
    KeyU: 10,
    KeyJ: 11,
    KeyK: 12,
    KeyO: 13,
    KeyL: 14,
    KeyP: 15,
};

const MusicalTyping = ({
    onNoteOn,
    onNoteOff,
    onOctaveUp,
    onOctaveDown,
    octave,
}) => {
    const activeNotes = useRef([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!e.repeat) {
                if (e.code === 'BracketLeft') {
                    cancelActiveNotes();
                    onOctaveDown();
                } else if (e.code === 'BracketRight') {
                    cancelActiveNotes();
                    onOctaveUp();
                } else {
                    const note = keyNoteMap[e.code];
                    if (
                        note !== undefined &&
                        !activeNotes.current.includes(note)
                    ) {
                        const midiNote = getMIDINote(note);
                        if (midiNote < 128) {
                            activeNotes.current.push(midiNote);
                            onNoteOn(midiNote);
                        }
                    }
                }
            }
        };

        const handleKeyUp = (e) => {
            const note = keyNoteMap[e.code];
            if (note !== undefined) {
                const midiNote = getMIDINote(note);
                if (activeNotes.current.includes(midiNote)) {
                    _.pull(activeNotes.current, midiNote);
                    onNoteOff(midiNote);
                }
            }
        };

        const getMIDINote = (note) => {
            return note + (octave + 2) * 12;
        };

        const cancelActiveNotes = () => {
            for (let note of activeNotes.current) {
                onNoteOff(note);
            }
            activeNotes.current = [];
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [onNoteOn, onNoteOff, onOctaveUp, onOctaveDown, octave]);

    return null;
};

export default MusicalTyping;
