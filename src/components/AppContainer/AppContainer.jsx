import { useEffect, useState, useRef, useCallback } from 'react';
import { setMode } from '../../redux/patchEditorSlice';
import { connect } from 'react-redux';
import MIDIEnvironment from '../MIDI/MIDIEnvironment/MIDIEnvironment';
import { selectMIDIDevices } from '../../services/MIDIDeviceSelector';
import MIDIDeviceEnumerator from '../MIDI/MIDIDeviceEnumerator/MIDIDeviceEnumerator';
import App from '../App/App';
import MIDIPatchContainer from '../MIDI/MIDIPatchContainer/MIDIPatchContainer';
import SettingsDialogContainer from '../SettingsDialogContainer/SettingsDialogContainer';
import ConsoleDevTools from '../ConsoleDevTools/ConsoleDevTools';
import ExportSysExDialogContainer from '../ExportSysExDialogContainer/ExportSysExDialogContainer';
import AboutDialogContainer from '../AboutDialogContainer/AboutDialogContainer';
import AppControllerProvider from '../AppControllerProvider/AppControllerProvider';

const AppContainer = ({ dispatch, mode, preferredDevices }) => {
    const [ready, setReady] = useState(false);
    const [suspended, setSuspended] = useState(false);
    const [deviceList, setDeviceList] = useState({
        inputs: [],
        outputs: [],
    });

    const _handleReadyChanged = (ready) => {
        setReady(ready);
    };

    const _handleSuspendedChanged = (suspended) => {
        setSuspended(suspended);
    };

    const _handleDeviceListChanged = useCallback(
        (newDeviceList) => {
            setDeviceList(newDeviceList);
        },
        [setDeviceList]
    );

    const { synthInputPort, synthOutputPort, controlInputPort } =
        selectMIDIDevices(deviceList, mode, preferredDevices);
    const selectMode = (newMode) => dispatch(setMode(newMode));

    return (
        <>
            <MIDIDeviceEnumerator setDeviceList={_handleDeviceListChanged} />
            <MIDIEnvironment
                synthInputPort={synthInputPort}
                synthOutputPort={synthOutputPort}
                controlInputPort={controlInputPort}
                onReadyChanged={_handleReadyChanged}
                onSuspendedChanged={_handleSuspendedChanged}
                mode={mode}
            >
                <ConsoleDevTools />
                <AppControllerProvider>
                    <App
                        mode={mode}
                        onSelectMode={selectMode}
                        ready={ready}
                        suspended={suspended}
                        onResumeAudioContext={() => synthOutputPort?.resume()}
                    />
                </AppControllerProvider>
                <MIDIPatchContainer mode={mode} />
                <SettingsDialogContainer devices={deviceList} />
                <ExportSysExDialogContainer open={true} onClose={() => {}} />
            </MIDIEnvironment>
            <AboutDialogContainer />
        </>
    );
};

const mapStateToProps = (state) => ({
    mode: state.patchEditor.mode,
    preferredDevices: state.settings.preferredDevices,
});

export default connect(mapStateToProps)(AppContainer);
