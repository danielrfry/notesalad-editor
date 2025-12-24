import React from 'react';
import Keyboard from '../Keyboard/Keyboard';
import _ from 'lodash';
import Note from '../MIDI/Note/Note';

const KeyboardContainer = ({ midiOutputService, enabled }) => {
    const [activeNotes, setActiveNotes] = React.useState([]);

    const noteOn = (noteNum) => {
        if (midiOutputService) {
            setActiveNotes((prevActiveNotes) =>
                _.union(prevActiveNotes, [noteNum])
            );
        }
    };

    const noteOff = (noteNum) => {
        if (midiOutputService) {
            setActiveNotes((prevActiveNotes) =>
                _.without(prevActiveNotes, noteNum)
            );
        }
    };

    return (
        <>
            <Keyboard
                onNoteOn={noteOn}
                onNoteOff={noteOff}
                activeNotes={activeNotes}
                enabled={enabled}
            />
            {activeNotes.map((noteNum) => (
                <Note noteNum={noteNum} key={noteNum} />
            ))}
        </>
    );
};

export default KeyboardContainer;
