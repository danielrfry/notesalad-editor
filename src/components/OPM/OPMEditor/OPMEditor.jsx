import { Modes } from '../../../types';
import GenericParamsEditor from '../../GenericParamsEditor/GenericParamsEditor';
import PageControl from '../../PageControl/PageControl';
import OPMParamsEditor from '../OPMParamsEditor/OPMParamsEditor';

const OPMEditor = ({ midi, enabled }) => (
    <PageControl>
        <OPMParamsEditor midi={midi} enabled={enabled} />
        <GenericParamsEditor mode={Modes.OPM} />
    </PageControl>
);

export default OPMEditor;
