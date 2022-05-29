import React from 'react';
import Keyboard from '../Keyboard/Keyboard';
import _ from 'lodash';
import Note from '../MIDI/Note/Note';

export default class KeyboardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeNotes: [],
        };
    }

    render = () => {
        const { enabled } = this.props;
        const { activeNotes } = this.state;
        return (
            <>
                <Keyboard
                    onNoteOn={this.noteOn}
                    onNoteOff={this.noteOff}
                    activeNotes={activeNotes}
                    enabled={enabled}
                />
                {activeNotes.map(noteNum => (
                    <Note noteNum={noteNum} key={noteNum} />
                ))}
            </>
        );
    };

    noteOn = noteNum => {
        const { midiOutputService } = this.props;

        if (midiOutputService) {
            this.setState(state => ({
                activeNotes: _.union(state.activeNotes, [noteNum]),
            }));
        }
    };

    noteOff = noteNum => {
        const { midiOutputService } = this.props;

        if (midiOutputService) {
            this.setState(state => ({
                activeNotes: _.without(state.activeNotes, noteNum),
            }));
        }
    };
}
