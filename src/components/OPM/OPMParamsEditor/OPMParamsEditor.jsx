import OPMGlobalParams from '../OPMGlobalParams/OPMGlobalParams';
import OPMOpParams from '../OPMOpParams/OPMOpParams';
import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import _ from 'lodash';

const OPMParamsEditor = ({ enabled }) => (
    <ColumnsLayout stretchV stretchH>
        <OPMGlobalParams enabled={enabled} />
        {_.times(4, (op) => (
            <div key={`op_${op}`} className={`opm-patch-editor__op${op + 1}`}>
                <OPMOpParams opIndex={op} enabled={enabled} />
            </div>
        ))}
    </ColumnsLayout>
);

export default OPMParamsEditor;
