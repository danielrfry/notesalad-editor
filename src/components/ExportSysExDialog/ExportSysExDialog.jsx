import { useCallback, useRef } from 'react';
import Button from '../Button/Button';
import ColumnsLayout from '../ColumnsLayout/ColumnsLayout';
import CustomDialog from '../CustomDialog/CustomDialog';
import TitledGroup from '../TitledGroup/TitledGroup';
import SysExDataContainer from './SysExDataContainer/SysExDataContainer';
import MelodicDestParams from './MelodicDestParams/MelodicDestParams';
import DrumDestParams from './DrumDestParams/DrumDestParams';
import ChannelDestParams from './ChannelDestParams/ChannelDestParams';
import { PatchAddressTypes } from '../../types';

import './ExportSysExDialog.css';

const getDestinationParams = (type) => {
    switch (type) {
        case PatchAddressTypes.Channel:
            return <ChannelDestParams />;
        case PatchAddressTypes.MelodicProgram:
            return <MelodicDestParams />;
        case PatchAddressTypes.DrumProgram:
            return <DrumDestParams />;
        default:
            return null;
    }
};

const ExportSysExDialog = ({
    open,
    destinationType,
    sysExData,
    onSetDestination,
    onClose,
    onSaveSyx,
}) => {
    const setDestChannel = useCallback(
        () => onSetDestination(PatchAddressTypes.Channel),
        [onSetDestination]
    );
    const setDestMelodicProg = useCallback(
        () => onSetDestination(PatchAddressTypes.MelodicProgram),
        [onSetDestination]
    );
    const setDestDrumProg = useCallback(
        () => onSetDestination(PatchAddressTypes.DrumProgram),
        [onSetDestination]
    );
    const closeButtonRef = useRef();

    return (
        <CustomDialog
            title="Export SysEx"
            open={open}
            onClose={onClose}
            initialFocus={closeButtonRef}
        >
            <TitledGroup title="DESTINATION">
                <ColumnsLayout
                    stretchH
                    extraClasses="exportSysExDlg__destination"
                >
                    <Button
                        highlighted={
                            destinationType === PatchAddressTypes.Channel
                        }
                        onClick={setDestChannel}
                        small
                    >
                        CHANNEL
                    </Button>
                    <Button
                        highlighted={
                            destinationType === PatchAddressTypes.MelodicProgram
                        }
                        onClick={setDestMelodicProg}
                        small
                    >
                        MELODIC
                    </Button>
                    <Button
                        highlighted={
                            destinationType === PatchAddressTypes.DrumProgram
                        }
                        onClick={setDestDrumProg}
                        small
                    >
                        DRUM
                    </Button>
                </ColumnsLayout>
                <div className="exportSysExDlg__destParams">
                    {getDestinationParams(destinationType)}
                </div>
            </TitledGroup>
            <TitledGroup title="SYSEX DATA">
                <SysExDataContainer data={sysExData}></SysExDataContainer>
            </TitledGroup>
            <CustomDialog.ButtonGroup>
                <CustomDialog.Button
                    onClick={onSaveSyx}
                    isDefault
                    enabled={sysExData?.length > 0}
                >
                    Save .SYX
                </CustomDialog.Button>
                <CustomDialog.Button onClick={onClose} ref={closeButtonRef}>
                    Close
                </CustomDialog.Button>
            </CustomDialog.ButtonGroup>
        </CustomDialog>
    );
};

export default ExportSysExDialog;
