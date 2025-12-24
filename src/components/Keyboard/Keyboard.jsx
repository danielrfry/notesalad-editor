import React from 'react';
import _ from 'lodash';
import KeyboardOctave from './KeyboardOctave/KeyboardOctave';
import MusicalTyping from './MusicalTyping/MusicalTyping';
import { clamp } from '../../utils';
import classNames from 'classnames';

import './Keyboard.css';

const FIRST_OCTAVE = -2;
const LAST_OCTAVE = 8;
const NUM_OCTAVES = LAST_OCTAVE - FIRST_OCTAVE + 1;

const Keyboard = ({ onNoteOff, onNoteOn, activeNotes, enabled }) => {
    const [keyboardOctave, setKeyboardOctave] = React.useState(3);
    const selectedNotes = React.useRef({});
    const octaveRefs = React.useRef(
        _.times(NUM_OCTAVES, () => React.createRef())
    );

    const scrollToOctave = (octave, centre) => {
        let i = octave - FIRST_OCTAVE;
        if (octaveRefs.current[i]) {
            const el = octaveRefs.current[i].current;
            if (el) {
                el.scrollIntoView({ block: centre ? 'center' : 'nearest' });
            }
        }
    };

    const handlePointerDown = (e) => {
        e.preventDefault();
        const noteAtPointer = getNoteAtLocation(e.clientX, e.clientY);
        selectNote(noteAtPointer, e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (e.pointerId in selectedNotes.current) {
            e.preventDefault();
            const noteAtPointer = getNoteAtLocation(e.clientX, e.clientY);
            selectNote(noteAtPointer, e.pointerId);
        }
    };

    const handlePointerUp = (e) => {
        if (e.pointerId in selectedNotes.current) {
            e.preventDefault();
            selectNote(undefined, e.pointerId);
        }
    };

    const selectNote = (noteNum, pointerId) => {
        if (noteNum < 0 || noteNum > 127) {
            noteNum = undefined;
        }

        const selNote = selectedNotes.current[pointerId];
        if (selNote !== noteNum) {
            if (selNote !== undefined && selNote !== null) {
                onNoteOff(selNote);
            }
            if (noteNum === undefined) {
                delete selectedNotes.current[pointerId];
            } else {
                selectedNotes.current[pointerId] = noteNum;
            }
            if (noteNum !== undefined && noteNum !== null) {
                onNoteOn(noteNum);
            }
        }
    };

    const getNoteAtLocation = (x, y) => {
        const el = document.elementFromPoint(x, y);
        if (el) {
            const noteNum = el.dataset.notenum;
            return noteNum === undefined ? null : parseInt(noteNum);
        } else {
            return null;
        }
    };

    const handleOctaveDown = () => {
        setKeyboardOctave(clamp(FIRST_OCTAVE, LAST_OCTAVE, keyboardOctave - 1));
    };

    const handleOctaveUp = () => {
        setKeyboardOctave(clamp(FIRST_OCTAVE, LAST_OCTAVE, keyboardOctave + 1));
    };

    React.useEffect(() => {
        scrollToOctave(keyboardOctave, true);
    }, []);

    React.useEffect(
        () => scrollToOctave(keyboardOctave, false),
        [keyboardOctave]
    );

    const octaves = [];

    for (let i = NUM_OCTAVES - 1; i >= 0; i--) {
        const octave = FIRST_OCTAVE + i;
        octaves.push(
            <div key={`octave_container_${octave}`} ref={octaveRefs.current[i]}>
                <KeyboardOctave
                    key={`octave_${octave}`}
                    octave={octave}
                    activeNotes={activeNotes}
                    highlighted={octave === keyboardOctave}
                />
            </div>
        );
    }

    return (
        <div className="keyboard__scroll-container" tabIndex={enabled ? 0 : -1}>
            <MusicalTyping
                octave={keyboardOctave}
                onNoteOn={onNoteOn}
                onNoteOff={onNoteOff}
                onOctaveUp={handleOctaveUp}
                onOctaveDown={handleOctaveDown}
            />
            <div
                className={classNames('keyboard__keyboard', {
                    'ui-element--enabled': enabled,
                    'ui-element--disabled': !enabled,
                })}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                {octaves}
            </div>
        </div>
    );
};

export default Keyboard;
