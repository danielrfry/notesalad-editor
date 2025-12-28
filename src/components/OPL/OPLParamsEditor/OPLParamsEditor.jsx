import OPLGlobalParams from '../OPLGlobalParams/OPLGlobalParams';
import OPLOpParams from '../OPLOpParams/OPLOpParams';
import _ from 'lodash';
import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import { useSelector } from 'react-redux';
import { Modes } from '../../../types';

const selectIs4Op = (state) => state.patchEditor.patch[Modes.OPL].is4Op;

const OPLParamsEditor = ({ enabled }) => {
    const is4Op = useSelector(selectIs4Op);
    return (
        <ColumnsLayout stretchV stretchH>
            <OPLGlobalParams enabled={enabled} />
            {_.times(4, (op) => (
                <div
                    key={`op_${op}`}
                    className={`opl-patch-editor__op${op + 1}`}
                >
                    <OPLOpParams
                        opIndex={op}
                        enabled={enabled && (op < 2 || is4Op)}
                    ></OPLOpParams>
                </div>
            ))}
        </ColumnsLayout>
    );
};

export default OPLParamsEditor;
