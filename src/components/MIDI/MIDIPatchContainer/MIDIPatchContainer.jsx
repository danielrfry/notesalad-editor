import React from 'react';
import { connect } from 'react-redux';
import patchSchemaManager from '../../../services/PatchSchemaManager';
import NRPNContainer from '../NRPNContainer/NRPNContainer';

const MIDIPatchContainer = ({ mode }) => {
    const schema = patchSchemaManager.schemas[mode];

    return schema?.params.map(param => (
        <NRPNContainer
            param={param.id}
            path={`${mode}.${param.path}`}
            key={param.id}
        />
    ));
};

const mapStateToProps = state => ({
    mode: state.patchEditor.mode,
});

export default connect(mapStateToProps)(MIDIPatchContainer);
