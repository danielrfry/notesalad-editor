import React from 'react';
import OPLGlobalParams from '../OPLGlobalParams/OPLGlobalParams';
import OPLOpParams from '../OPLOpParams/OPLOpParams';
import _ from 'lodash';
import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import { connect } from 'react-redux';
import { Modes } from '../../../types';

const OPLParamsEditor = ({ enabled, is4Op }) => (
    <ColumnsLayout stretchV stretchH>
        <OPLGlobalParams enabled={enabled} />
        {_.times(4, op => (
            <div key={`op_${op}`} className={`opl-patch-editor__op${op + 1}`}>
                <OPLOpParams
                    opIndex={op}
                    enabled={enabled && (op < 2 || is4Op)}
                ></OPLOpParams>
            </div>
        ))}
    </ColumnsLayout>
);

const mapStateToProps = state => ({
    is4Op: state.patchEditor.patch[Modes.OPL].is4Op,
});

export default connect(mapStateToProps)(OPLParamsEditor);
