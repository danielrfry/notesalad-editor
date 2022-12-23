import React from 'react';
import AppMenuContainer from '../AppMenuContainer/AppMenuContainer';
import KeyboardEditor from '../KeyboardEditor/KeyboardEditor';
import CustomMenuButton from '../CustomMenuButton/CustomMenuButton';
import { MIDIOutputServiceContext } from '../MIDI/MIDIOutputServiceProvider/MIDIOutputServiceProvider';
import Toolbar, { ToolbarItem } from '../Toolbar/Toolbar';
import OPLEditor from '../OPL/OPLEditor/OPLEditor';
import OPMEditor from '../OPM/OPMEditor/OPMEditor';
import SD1Editor from '../SD1/SD1Editor/SD1Editor';
import { Modes } from '../../types';
import FileBrowser from '../FileBrowser/FileBrowser';
import Theme from '../Theme/Theme';
import { useContext } from 'react';
import { AppControllerContext } from '../AppControllerProvider/AppControllerProvider';

import './App.css';
import { useCallback } from 'react';

const getPatchEditor = mode => {
    switch (mode) {
        case Modes.OPL:
            return OPLEditor;
        case Modes.OPM:
            return OPMEditor;
        case Modes.SD1:
            return SD1Editor;
        default:
    }
};

const getCSSThemeForMode = mode => {
    switch (mode) {
        case Modes.OPM:
            return 'theme-opm';
        case Modes.SD1:
            return 'theme-sd1';
        default:
            return '';
    }
};

const App = ({
    mode,
    onSelectMode,
    ready,
    suspended,
    onResumeAudioContext,
}) => {
    const appController = useContext(AppControllerContext);
    const handlePatchFileSelected = useCallback(
        e => appController.openPatch(e.target.files),
        [appController]
    );
    return (
        <div className="app">
            <Theme themeClass={getCSSThemeForMode(mode)} />
            <div className="app__toolbar">
                <Toolbar>
                    <CustomMenuButton>
                        <AppMenuContainer appController={appController} />
                    </CustomMenuButton>
                    <ToolbarItem
                        highlighted={mode === Modes.OPL}
                        onClick={() => onSelectMode(Modes.OPL)}
                    >
                        OPL
                    </ToolbarItem>
                    <ToolbarItem
                        highlighted={mode === Modes.OPM}
                        onClick={() => onSelectMode(Modes.OPM)}
                    >
                        OPM
                    </ToolbarItem>
                    <ToolbarItem
                        highlighted={mode === Modes.SD1}
                        onClick={() => onSelectMode(Modes.SD1)}
                    >
                        SD-1
                    </ToolbarItem>
                </Toolbar>
            </div>
            <div className="app__body">
                {mode && (
                    <MIDIOutputServiceContext.Consumer>
                        {midiOutputService => (
                            <KeyboardEditor
                                editor={getPatchEditor(mode)}
                                mode={mode}
                                midiOutputService={midiOutputService}
                                enabled={ready}
                                suspended={suspended}
                                onResumeClicked={onResumeAudioContext}
                            />
                        )}
                    </MIDIOutputServiceContext.Consumer>
                )}
            </div>
            <FileBrowser
                ref={appController.patchFileBrowserRef}
                accept="application/json,.json"
                onFileSelected={handlePatchFileSelected}
            />
        </div>
    );
};

export default App;
