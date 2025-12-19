import { Modes } from '../../types';
import OPLConnectionImage from './OPLConnectionImage';
import OPMConnectionImage from './OPMConnectionImage';
import SD1ConnectionImage from './SD1ConnectionImage';

const ConnectionImage = ({ path, conn, ...others }) => {
    switch (path) {
        case `${Modes.OPL}.conn`:
            return <OPLConnectionImage conn={conn} {...others} />;
        case `${Modes.OPM}.conn`:
            return <OPMConnectionImage conn={conn} {...others} />;
        case `${Modes.SD1}.alg`:
            return <SD1ConnectionImage conn={conn} {...others} />;
        default:
            return null;
    }
};

export default ConnectionImage;
