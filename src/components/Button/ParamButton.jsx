import {
    setPatchParam,
    togglePatchParam,
    togglePatchParamBit,
} from '../../redux/patchEditorSlice';
import Button from './Button';
import patchSchemaManager from '../../services/PatchSchemaManager';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const getHighlighted = (set, toggle, toggleBit, value) => {
    if (toggleBit) {
        return value & toggleBit;
    } else if (toggle) {
        return !!value;
    } else {
        return value === set;
    }
};

const ParamButton = ({ path, set, toggle, toggleBit, ...buttonProps }) => {
    const dispatch = useDispatch();

    const handleClick = useCallback(() => {
        if (toggleBit) {
            dispatch(togglePatchParamBit(path, toggleBit));
        } else if (toggle) {
            dispatch(togglePatchParam(path));
        } else {
            dispatch(setPatchParam(path, set));
        }
    }, [dispatch, path, set, toggle, toggleBit]);

    const selectParamValue = useCallback((state) => {
        return patchSchemaManager.getParamValue(path, state.patchEditor.patch);
    }, [path]);

    const paramValue = useSelector(selectParamValue);
    const highlighted = getHighlighted(set, toggle, toggleBit, paramValue);

    return <Button {...buttonProps} onClick={handleClick} highlighted={highlighted} />;
}

export default ParamButton;
