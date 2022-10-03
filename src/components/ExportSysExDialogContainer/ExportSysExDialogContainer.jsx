import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import {
    closeExportSysExDialog,
    setExportSysExDestinationType,
} from '../../redux/uiStateSlice';
import ExportSysExDialog from '../ExportSysExDialog/ExportSysExDialog';
import useSysExData from '../../hooks/sysExData';
import { downloadBlob } from '../../utils';

const ExportSysExDialogContainer = ({
    open,
    onClose,
    destinationAddress,
    onSetDestinationType,
}) => {
    const handleClose = useCallback(() => onClose(), [onClose]);
    const sysExData = useSysExData(open && destinationAddress);

    const handleSaveSyx = useCallback(
        () =>
            downloadBlob(
                new Blob([new Uint8Array(sysExData)], {
                    type: 'application/octet-stream',
                }),
                'patch.syx',
                [
                    {
                        description: 'SysEx files',
                        accept: { 'application/octet-stream': ['.syx'] },
                    },
                ]
            ),
        [sysExData]
    );

    return (
        <ExportSysExDialog
            open={open}
            destinationType={destinationAddress.type}
            sysExData={sysExData}
            onSetDestination={onSetDestinationType}
            onClose={handleClose}
            onSaveSyx={handleSaveSyx}
        />
    );
};

const mapStateToProps = state => ({
    open: state.uiState.exportSysExDialogOpen,
    destinationAddress: state.uiState.exportSysExDialog.destinationAddress,
});
const mapDispatchToProps = {
    onClose: closeExportSysExDialog,
    onSetDestinationType: setExportSysExDestinationType,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExportSysExDialogContainer);
