import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import SD1GlobalParams from '../SD1GlobalParams/SD1GlobalParams';
import SD1OpEditor from '../SD1OpParams/SD1OpParams';
import _ from 'lodash';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Modes } from '../../../types';
import { isSD1Patch4Op } from '../../../services/SD1/SD1PatchSchema';
import { setSD1Patch4Op } from '../../../redux/patchEditorSlice';

const selectPatch = (state) => state.patchEditor.patch[Modes.SD1];

const SD1ParamsEditor = ({ enabled }) => {
    const patch = useSelector(selectPatch);
    const is4Op = isSD1Patch4Op(patch);
    const dispatch = useDispatch();
    const handleSet4Op = (new4Op) => {
        dispatch(setSD1Patch4Op(new4Op));
    };

    return (
        <ColumnsLayout stretchV stretchH>
            <SD1GlobalParams
                enabled={enabled}
                patch={patch}
                onSet4Op={handleSet4Op}
            />
            {_.times(4, (op) => (
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

export default SD1ParamsEditor;
