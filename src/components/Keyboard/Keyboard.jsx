import React from 'react';
import _ from 'lodash';
import KeyboardOctave from './KeyboardOctave/KeyboardOctave';
import MusicalTyping from './MusicalTyping/MusicalTyping';
import { shallowCompare, clamp } from '../../utils';
import classNames from 'classnames';

import './Keyboard.css';

const FIRST_OCTAVE = -2;
const LAST_OCTAVE = 8;
const NUM_OCTAVES = LAST_OCTAVE - FIRST_OCTAVE + 1;

class Keyboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = { keyboardOctave: 3 };
        this.selectedNotes = {};
        this.octaveRefs = _.times(NUM_OCTAVES, () => React.createRef());
    }

    componentDidMount = () => {
        this.scrollToOctave(this.state.keyboardOctave, true);
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.keyboardOctave !== prevState.keyboardOctave) {
            this.scrollToOctave(this.state.keyboardOctave, false);
        }
    };

    handlePointerDown = (e) => {
        e.preventDefault();
        const noteAtPointer = this.getNoteAtLocation(e.clientX, e.clientY);
        this.selectNote(noteAtPointer, e.pointerId);
    };

    handlePointerMove = (e) => {
        if (e.pointerId in this.selectedNotes) {
            e.preventDefault();
            const noteAtPointer = this.getNoteAtLocation(e.clientX, e.clientY);
            this.selectNote(noteAtPointer, e.pointerId);
        }
    };

    handlePointerUp = (e) => {
        if (e.pointerId in this.selectedNotes) {
            e.preventDefault();
            this.selectNote(undefined, e.pointerId);
        }
    };

    selectNote = (noteNum, pointerId) => {
        if (noteNum < 0 || noteNum > 127) {
            noteNum = undefined;
        }

        const selNote = this.selectedNotes[pointerId];
        if (selNote !== noteNum) {
            const { onNoteOff, onNoteOn } = this.props;
            if (selNote !== undefined && selNote !== null) {
                onNoteOff(selNote);
            }
            if (noteNum === undefined) {
                delete this.selectedNotes[pointerId];
            } else {
                this.selectedNotes[pointerId] = noteNum;
            }
            if (noteNum !== undefined && noteNum !== null) {
                onNoteOn(noteNum);
            }
        }
    };

    getNoteAtLocation = (x, y) => {
        const el = document.elementFromPoint(x, y);
        if (el) {
            const noteNum = el.dataset.notenum;
            return noteNum === undefined ? null : parseInt(noteNum);
        } else {
            return null;
        }
    };

    handleOctaveDown = () => {
        this.setState({
            keyboardOctave: clamp(
                FIRST_OCTAVE,
                LAST_OCTAVE,
                this.state.keyboardOctave - 1
            ),
        });
    };

    handleOctaveUp = () => {
        this.setState({
            keyboardOctave: clamp(
                FIRST_OCTAVE,
                LAST_OCTAVE,
                this.state.keyboardOctave + 1
            ),
        });
    };

    render = () => {
        const octaves = [];
        const { activeNotes, enabled } = this.props;

        for (let i = NUM_OCTAVES - 1; i >= 0; i--) {
            const octave = FIRST_OCTAVE + i;
            octaves.push(
                <div
                    key={`octave_container_${octave}`}
                    ref={this.octaveRefs[i]}
                >
                    <KeyboardOctave
                        key={`octave_${octave}`}
                        octave={octave}
                        activeNotes={activeNotes}
                        highlighted={octave === this.state.keyboardOctave}
                    />
                </div>
            );
        }

        return (
            <div
                className="keyboard__scroll-container"
                tabIndex={enabled ? 0 : -1}
            >
                <MusicalTyping
                    octave={this.state.keyboardOctave}
                    onNoteOn={this.props.onNoteOn}
                    onNoteOff={this.props.onNoteOff}
                    onOctaveUp={this.handleOctaveUp}
                    onOctaveDown={this.handleOctaveDown}
                />
                <div
                    className={classNames('keyboard__keyboard', {
                        'ui-element--enabled': enabled,
                        'ui-element--disabled': !enabled,
                    })}
                    onPointerDown={this.handlePointerDown}
                    onPointerMove={this.handlePointerMove}
                    onPointerUp={this.handlePointerUp}
                >
                    {octaves}
                </div>
            </div>
        );
    };

    scrollToOctave = (octave, centre) => {
        let i = octave - FIRST_OCTAVE;
        if (this.octaveRefs[i]) {
            const el = this.octaveRefs[i].current;
            if (el) {
                el.scrollIntoView({ block: centre ? 'center' : 'nearest' });
            }
        }
    };

    shouldComponentUpdate = (nextProps, nextState) =>
        !shallowCompare(this.props, nextProps) ||
        !shallowCompare(this.state, nextState);
}
export default Keyboard;
