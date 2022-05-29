import _ from 'lodash';
import { connect } from 'react-redux';
import NRPN from '../NRPN/NRPN';

const mapStateToProps = (state, ownProps) => {
    const { path } = ownProps;
    return { value: _.get(state.patchEditor.patch, path) };
};

export default connect(mapStateToProps)(NRPN);
