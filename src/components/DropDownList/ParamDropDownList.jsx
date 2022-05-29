import { connect } from 'react-redux';
import { setPatchParam } from '../../redux/patchEditorSlice';
import patchSchemaManager from '../../services/PatchSchemaManager';
import DropDownList from './DropDownList';

const mapStateToProps = (state, ownProps) => ({
    value: patchSchemaManager.getParamValue(
        ownProps.path,
        state.patchEditor.patch
    ),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: value => dispatch(setPatchParam(ownProps.path, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropDownList);
