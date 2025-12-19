import { Modes } from '../../../types';
import GenericParamsEditor from '../../GenericParamsEditor/GenericParamsEditor';
import PageControl from '../../PageControl/PageControl';
import OPLParamsEditor from '../OPLParamsEditor/OPLParamsEditor';

const OPLEditor = ({ midi, enabled }) => (
    <PageControl>
        <OPLParamsEditor midi={midi} enabled={enabled} />
        <GenericParamsEditor mode={Modes.OPL} />
    </PageControl>
);

export default OPLEditor;
