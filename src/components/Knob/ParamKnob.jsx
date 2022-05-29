import { connect } from 'react-redux';
import { setPatchParam } from '../../redux/patchEditorSlice';
import patchSchemaManager from '../../services/PatchSchemaManager';
import Knob from './Knob';

const mapStateToProps = (state, ownProps) => {
    const { path } = ownProps;
    const param = patchSchemaManager.getParamInfo(
        path,
        state.patchEditor.patch
    );
    if (!param) {
        throw new Error(`Undefined parameter: ${path}`);
    }
    const { range } = param;
    const [min, max] = range;
    const value = patchSchemaManager.getParamValue(
        path,
        state.patchEditor.patch
    );
    const formatter = param.formatter;

    return {
        min,
        max,
        value,
        formatter,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onValueChange: value => dispatch(setPatchParam(ownProps.path, value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Knob);
