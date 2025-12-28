import _ from 'lodash';
import { useSelector } from 'react-redux';
import NRPN from '../NRPN/NRPN';
import { useCallback } from 'react';

const NRPNContainer = ({ path, ...props }) => {
    const selectParamValue = useCallback(
        (state) => _.get(state.patchEditor.patch, path),
        [path]
    );
    const value = useSelector(selectParamValue);
    return <NRPN value={value} {...props} />;
};

export default NRPNContainer;
