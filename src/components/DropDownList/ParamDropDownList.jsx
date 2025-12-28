import { setPatchParam } from '../../redux/patchEditorSlice';
import patchSchemaManager from '../../services/PatchSchemaManager';
import DropDownList from './DropDownList';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ParamDropDownList = ({ path, ...props }) => {
    const selectParamValue = useCallback(
        (state) =>
            patchSchemaManager.getParamValue(path, state.patchEditor.patch),
        [path]
    );
    const dispatch = useDispatch();
    const onChange = useCallback(
        (value) => dispatch(setPatchParam(path, value)),
        [dispatch, path]
    );
    const value = useSelector(selectParamValue);
    return <DropDownList value={value} onChange={onChange} {...props} />;
};

export default ParamDropDownList;
