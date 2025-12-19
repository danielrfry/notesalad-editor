import { useRef } from 'react';
import CustomDialog from '../CustomDialog/CustomDialog';
import TitledGroup from '../TitledGroup/TitledGroup';
import LicenceText from './LicenceText/LicenceText';
import GitHubIcon from '../GitHubIcon/GitHubIcon';

import './AboutDialog.css';

const THIRD_PARTY_LICENCES_URL = '/3rdpartylicences.html';

const AboutDialog = ({ open, onClose }) => {
    const initialFocusRef = useRef();
    return (
        <CustomDialog
            title="About Note Salad Editor"
            open={open}
            onClose={onClose}
            initialFocus={initialFocusRef}
        >
            <div className="aboutDialog__content">
                <TitledGroup title="ABOUT">
                    <p style={{ maxWidth: '100%' }}>
                        Patch editor, MIDI implementation and software
                        synthesizer for the Yamaha OPL, OPM and SD-1 FM
                        synthesizer chips.
                    </p>
                    <p>
                        <a
                            href="https://github.com/danielrfry/notesalad-editor/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GitHubIcon />
                            https://github.com/danielrfry/notesalad-editor/
                        </a>
                    </p>
                </TitledGroup>
                <TitledGroup title="LICENCE">
                    <LicenceText />
                </TitledGroup>
                <CustomDialog.ButtonGroup>
                    <a
                        href={THIRD_PARTY_LICENCES_URL}
                        target="_blank"
                        rel="noreferrer"
                    >
                        3rd Party Licences
                    </a>
                    <CustomDialog.Button
                        onClick={onClose}
                        ref={initialFocusRef}
                    >
                        Close
                    </CustomDialog.Button>
                </CustomDialog.ButtonGroup>
            </div>
        </CustomDialog>
    );
};

export default AboutDialog;
