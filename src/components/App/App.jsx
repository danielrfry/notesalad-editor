import React from 'react';
import AppMenuContainer from '../AppMenuContainer/AppMenuContainer';
import KeyboardEditor from '../KeyboardEditor/KeyboardEditor';
import MenuButton from '../MenuButton/MenuButton';
import { MIDIOutputServiceContext } from '../MIDI/MIDIOutputServiceProvider/MIDIOutputServiceProvider';
import Toolbar, { ToolbarItem } from '../Toolbar/Toolbar';
import OPLEditor from '../OPL/OPLEditor/OPLEditor';
import OPMEditor from '../OPM/OPMEditor/OPMEditor';
import SD1Editor from '../SD1/SD1Editor/SD1Editor';
import { Modes } from '../../types';
import FileBrowser from '../FileBrowser/FileBrowser';

import './App.css';
import Theme from '../Theme/Theme';

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
    appController,
    mode,
    onSelectMode,
    ready,
    suspended,
    onResumeAudioContext,
    onPatchFileSelected,
    fileBrowserRef,
}) => {
    return (
        <div className="app">
            <Theme themeClass={getCSSThemeForMode(mode)} />
            <div className="app__toolbar">
                <Toolbar>
                    <MenuButton>
                        <AppMenuContainer appController={appController} />
                    </MenuButton>
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
                ref={fileBrowserRef}
                accept="application/json,.json"
                onFileSelected={onPatchFileSelected}
            />
        </div>
    );
};

export default App;
