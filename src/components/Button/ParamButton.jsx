import { connect } from 'react-redux';
import {
    setPatchParam,
    togglePatchParam,
    togglePatchParamBit,
} from '../../redux/patchEditorSlice';
import Button from './Button';
import patchSchemaManager from '../../services/PatchSchemaManager';

const mapStateToProps = (state, ownProps) => {
    const { path, set, toggle, toggleBit } = ownProps;
    const value = patchSchemaManager.getParamValue(
        path,
        state.patchEditor.patch
    );

    if (toggleBit) {
        return { highlighted: value & toggleBit };
    } else if (toggle) {
        return { highlighted: !!value };
    } else {
        return { highlighted: value === set };
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { path, set, toggle, toggleBit } = ownProps;

    if (toggleBit) {
        return {
            onClick: () => dispatch(togglePatchParamBit(path, toggleBit)),
        };
    } else if (toggle) {
        return { onClick: () => dispatch(togglePatchParam(path)) };
    } else {
        return { onClick: () => dispatch(setPatchParam(path, set)) };
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
