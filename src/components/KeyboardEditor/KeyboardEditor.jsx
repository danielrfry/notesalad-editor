import React from 'react';
import KeyboardContainer from '../KeyboardContainer/KeyboardContainer';
import ResumeOverlay from '../ResumeOverlay/ResumeOverlay';

import './KeyboardEditor.css';

const KeyboardEditor = props => (
    <div className="keyboard-editor">
        <div className="keyboard-editor__keyboard">
            <KeyboardContainer
                midiOutputService={props.midiOutputService}
                enabled={props.enabled}
            />
        </div>
        <div className="keyboard-editor__editor">
            <props.editor
                midi={props.midiOutputService}
                enabled={props.enabled}
            ></props.editor>
            {props.suspended && (
                <ResumeOverlay onClick={props.onResumeClicked} />
            )}
        </div>
    </div>
);

export default KeyboardEditor;
