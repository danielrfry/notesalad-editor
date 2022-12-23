import React from 'react';
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

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            suspended: false,
            deviceList: { inputs: [], outputs: [] },
        };
    }

    _handleReadyChanged = ready => {
        this.setState({ ready });
    };

    _handleSuspendedChanged = suspended => {
        this.setState({ suspended });
    };

    _handleDeviceListChanged = newDeviceList => {
        this.setState({ deviceList: newDeviceList });
    };

    render = () => {
        const { mode, preferredDevices } = this.props;
        const { ready, suspended, deviceList } = this.state;
        const {
            synthInputPort,
            synthOutputPort,
            controlInputPort,
        } = selectMIDIDevices(deviceList, mode, preferredDevices);

        return (
            <>
                <MIDIDeviceEnumerator
                    setDeviceList={this._handleDeviceListChanged}
                />
                <MIDIEnvironment
                    synthInputPort={synthInputPort}
                    synthOutputPort={synthOutputPort}
                    controlInputPort={controlInputPort}
                    onReadyChanged={this._handleReadyChanged}
                    onSuspendedChanged={this._handleSuspendedChanged}
                    mode={mode}
                >
                    <ConsoleDevTools />
                    <AppControllerProvider>
                        <App
                            mode={mode}
                            onSelectMode={this.selectMode}
                            ready={ready}
                            suspended={suspended}
                            onResumeAudioContext={() =>
                                synthOutputPort?.resume()
                            }
                        />
                    </AppControllerProvider>
                    <MIDIPatchContainer mode={mode} />
                    <SettingsDialogContainer devices={deviceList} />
                    <ExportSysExDialogContainer
                        open={true}
                        onClose={() => {}}
                    />
                </MIDIEnvironment>
                <AboutDialogContainer />
            </>
        );
    };

    selectMode = newMode => this.props.dispatch(setMode(newMode));
}

const mapStateToProps = state => ({
    mode: state.patchEditor.mode,
    preferredDevices: state.settings.preferredDevices,
});

export default connect(mapStateToProps)(AppContainer);
