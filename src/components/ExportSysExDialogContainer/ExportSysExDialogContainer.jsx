import { useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    closeExportSysExDialog,
    setExportSysExDestinationType,
} from '../../redux/uiStateSlice';
import ExportSysExDialog from '../ExportSysExDialog/ExportSysExDialog';
import useSysExData from '../../hooks/sysExData';
import { downloadBlob } from '../../utils';

const selectDialogOpen = (state) => state.uiState.exportSysExDialogOpen;
const selectDestinationAddress = (state) =>
    state.uiState.exportSysExDialog.destinationAddress;

const ExportSysExDialogContainer = () => {
    const open = useSelector(selectDialogOpen);
    const destinationAddress = useSelector(selectDestinationAddress);

    const dispatch = useDispatch();
    const handleClose = useCallback(
        () => dispatch(closeExportSysExDialog()),
        [dispatch]
    );
    const handleSetDestination = useCallback(
        (newType) => dispatch(setExportSysExDestinationType(newType)),
        [dispatch]
    );

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
            onSetDestination={handleSetDestination}
            onClose={handleClose}
            onSaveSyx={handleSaveSyx}
        />
    );
};

export default ExportSysExDialogContainer;
