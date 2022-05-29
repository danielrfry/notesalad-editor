import { useContext, useEffect } from 'react';
import { MIDIOutputServiceContext } from '../MIDIOutputServiceProvider/MIDIOutputServiceProvider';

const NRPN = ({ param, value }) => {
    const outputService = useContext(MIDIOutputServiceContext);

    useEffect(() => {
        outputService?.nrpn(param, value);
    }, [param, value, outputService]);

    return null;
};

export default NRPN;
