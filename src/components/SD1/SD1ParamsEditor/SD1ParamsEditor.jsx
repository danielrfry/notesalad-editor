import React from 'react';
import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import SD1GlobalParams from '../SD1GlobalParams/SD1GlobalParams';
import SD1OpEditor from '../SD1OpParams/SD1OpParams';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Modes } from '../../../types';
import { isSD1Patch4Op } from '../../../services/SD1/SD1PatchSchema';
import { setSD1Patch4Op } from '../../../redux/patchEditorSlice';

const SD1ParamsEditor = ({ enabled, patch, onSet4Op }) => {
    const is4Op = isSD1Patch4Op(patch);

    return (
        <ColumnsLayout stretchV stretchH>
            <SD1GlobalParams
                enabled={enabled}
                patch={patch}
                onSet4Op={onSet4Op}
            />
            {_.times(4, op => (
                <div key={`op_${op}`}>
                    <SD1OpEditor
                        opIndex={op}
                        enabled={enabled && (op < 2 || is4Op)}
                    />
                </div>
            ))}
        </ColumnsLayout>
    );
};

const mapStateToProps = state => ({
    patch: state.patchEditor.patch[Modes.SD1],
});

const mapDispatchToProps = dispatch => ({
    onSet4Op: new4Op => dispatch(setSD1Patch4Op(new4Op)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SD1ParamsEditor);
