import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import './ResumeOverlay.css';

const ResumeOverlay = props => (
    <div className="resume-overlay" onClick={props.onClick}>
        <div className="resume-overlay__background" />
        <div className="resume-overlay__foreground">
            <FontAwesomeIcon icon={faPlay} size="5x" />
        </div>
    </div>
);

export default ResumeOverlay;
