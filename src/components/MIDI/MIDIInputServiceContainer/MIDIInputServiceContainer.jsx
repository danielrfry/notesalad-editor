import { useCallback } from 'react';
import { connect } from 'react-redux';
import { setPatchParamFromCC } from '../../../redux/patchEditorSlice';
import { CONTROL_TO_PARAM_MAPS } from '../../../services/ControlToParamMaps';
import MIDIInputServiceWrapper from '../MIDIInputServiceWrapper/MIDIInputServiceWrapper';

const MIDIInputServiceContainer = ({ controlInputPort, setParam, mode }) => {
    const handleParamChange = useCallback(
        (param, value) => {
            const patchParam = CONTROL_TO_PARAM_MAPS[mode][param];
            if (patchParam !== undefined) {
                const paramFullPath = `${mode}.${patchParam}`;
                setParam(paramFullPath, value);
            }
        },
        [mode, setParam]
    );

    return (
        <MIDIInputServiceWrapper
            controlInputPort={controlInputPort}
            onParamChange={handleParamChange}
        />
    );
};

const mapDispatchToProps = {
    setParam: setPatchParamFromCC,
};

const mapStateToProps = (state) => ({
    mode: state.patchEditor.mode,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MIDIInputServiceContainer);
