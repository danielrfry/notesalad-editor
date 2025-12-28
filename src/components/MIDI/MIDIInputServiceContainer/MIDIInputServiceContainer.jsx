import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPatchParamFromCC } from '../../../redux/patchEditorSlice';
import { CONTROL_TO_PARAM_MAPS } from '../../../services/ControlToParamMaps';
import MIDIInputServiceWrapper from '../MIDIInputServiceWrapper/MIDIInputServiceWrapper';
import { selectMode } from '../../../redux/selectors';

const MIDIInputServiceContainer = ({ controlInputPort }) => {
    const mode = useSelector(selectMode);

    const dispatch = useDispatch();

    const handleParamChange = useCallback(
        (param, value) => {
            const patchParam = CONTROL_TO_PARAM_MAPS[mode][param];
            if (patchParam !== undefined) {
                const paramFullPath = `${mode}.${patchParam}`;
                dispatch(setPatchParamFromCC(paramFullPath, value));
            }
        },
        [mode, dispatch]
    );

    return (
        <MIDIInputServiceWrapper
            controlInputPort={controlInputPort}
            onParamChange={handleParamChange}
        />
    );
};

export default MIDIInputServiceContainer;
