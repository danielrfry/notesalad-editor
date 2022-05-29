import React from 'react';
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

export default class MusicalTyping extends React.Component {
    constructor(props) {
        super(props);
        this.activeNotes = [];
    }

    componentDidMount = () => {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    };

    componentWillUnmount = () => {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    };

    handleKeyDown = e => {
        if (!e.repeat) {
            if (e.code === 'BracketLeft') {
                this.cancelActiveNotes();
                this.props.onOctaveDown();
            } else if (e.code === 'BracketRight') {
                this.cancelActiveNotes();
                this.props.onOctaveUp();
            } else {
                const note = keyNoteMap[e.code];
                if (note !== undefined && !this.activeNotes.includes(note)) {
                    const midiNote = this.getMIDINote(note);
                    if (midiNote < 128) {
                        this.activeNotes.push(midiNote);
                        this.props.onNoteOn(midiNote);
                    }
                }
            }
        }
    };

    handleKeyUp = e => {
        const note = keyNoteMap[e.code];
        if (note !== undefined) {
            const midiNote = this.getMIDINote(note);
            if (this.activeNotes.includes(midiNote)) {
                _.pull(this.activeNotes, midiNote);
                this.props.onNoteOff(midiNote);
            }
        }
    };

    getMIDINote = note => {
        return note + (this.props.octave + 2) * 12;
    };

    cancelActiveNotes = () => {
        for (let note of this.activeNotes) {
            this.props.onNoteOff(note);
        }
        this.activeNotes = [];
    };

    render = () => <></>;
}
