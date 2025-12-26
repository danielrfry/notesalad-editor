import _ from 'lodash';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExportSysExDestChannel } from '../../../redux/uiStateSlice';
import DropDownList, { DropDownItem } from '../../DropDownList/DropDownList';

const selectChannel = (state) => state.uiState.exportSysExDialog.destinationAddress.channel;

const ChannelDestParams = () => {
    const dispatch = useDispatch();
    const channel = useSelector(selectChannel);

    const handleChange = useCallback(
        (channel) => {
            dispatch(setExportSysExDestChannel(parseInt(channel)));
        },
        [dispatch]
    );

    return (
        <>
            <p>
                Sending the SysEx message will assign the patch to the selected
                channel:
            </p>
            <DropDownList value={channel} onChange={handleChange}>
                {_.range(0, 16).map((ch) => (
                    <DropDownItem key={ch} value={ch}>
                        Channel {ch + 1}
                    </DropDownItem>
                ))}
            </DropDownList>
        </>
    );
};

export default ChannelDestParams;
