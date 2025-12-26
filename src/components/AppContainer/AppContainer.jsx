import { useState, useCallback } from 'react';
import { setMode } from '../../redux/patchEditorSlice';
import { useDispatch, useSelector } from 'react-redux';
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
import { selectMode, selectPreferredDevices } from '../../redux/selectors';

const AppContainer = () => {
    const mode = useSelector(selectMode);
    const preferredDevices = useSelector(selectPreferredDevices);
    const dispatch = useDispatch();

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
    const handleSelectMode = (newMode) => dispatch(setMode(newMode));

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
                        onSelectMode={handleSelectMode}
                        ready={ready}
                        suspended={suspended}
                        onResumeAudioContext={() => synthOutputPort?.resume()}
                    />
                </AppControllerProvider>
                <MIDIPatchContainer mode={mode} />
                <SettingsDialogContainer devices={deviceList} />
                <ExportSysExDialogContainer open={true} onClose={() => { }} />
            </MIDIEnvironment>
            <AboutDialogContainer />
        </>
    );
};

export default AppContainer;
