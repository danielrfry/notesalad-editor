import _ from 'lodash';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { setExportSysExDestChannel } from '../../../redux/uiStateSlice';
import DropDownList, { DropDownItem } from '../../DropDownList/DropDownList';

const ChannelDestParams = ({ channel, onSetChannel }) => {
    const handleChange = useCallback(
        (channel) => {
            onSetChannel(parseInt(channel));
        },
        [onSetChannel]
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

const mapStateToProps = (state) => ({
    channel: state.uiState.exportSysExDialog.destinationAddress.channel,
});
const mapDispatchToProps = {
    onSetChannel: setExportSysExDestChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDestParams);
