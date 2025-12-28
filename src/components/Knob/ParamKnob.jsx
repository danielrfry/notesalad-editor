import { useDispatch, useSelector } from 'react-redux';
import { setPatchParam } from '../../redux/patchEditorSlice';
import patchSchemaManager from '../../services/PatchSchemaManager';
import Knob from './Knob';
import { selectPatch } from '../../redux/selectors';
import { useCallback } from 'react';

const ParamKnob = ({ path, ...props }) => {
    const patch = useSelector(selectPatch);
    const param = patchSchemaManager.getParamInfo(path, patch);
    if (!param) {
        throw new Error(`Undefined parameter: ${path}`);
    }
    const { range } = param;
    const [min, max] = range;
    const value = patchSchemaManager.getParamValue(path, patch);
    const formatter = param.formatter;

    const dispatch = useDispatch();
    const handleValueChange = useCallback(
        (newValue) => dispatch(setPatchParam(path, newValue)),
        [dispatch, path]
    );

    return (
        <Knob
            min={min}
            max={max}
            value={value}
            formatter={formatter}
            onValueChange={handleValueChange}
            {...props}
        />
    );
};

export default ParamKnob;
