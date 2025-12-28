import { connect, useSelector } from 'react-redux';
import patchSchemaManager from '../../../services/PatchSchemaManager';
import NRPNContainer from '../NRPNContainer/NRPNContainer';
import { selectMode } from '../../../redux/selectors';

const MIDIPatchContainer = () => {
    const mode = useSelector(selectMode);
    const schema = patchSchemaManager.schemas[mode];

    return schema?.params.map((param) => (
        <NRPNContainer
            param={param.id}
            path={`${mode}.${param.path}`}
            key={param.id}
        />
    ));
};

export default MIDIPatchContainer;
