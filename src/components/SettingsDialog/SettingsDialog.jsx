import { useRef } from 'react';
import CustomDialog from '../CustomDialog/CustomDialog';
import DropDownList, { DropDownItem } from '../DropDownList/DropDownList';
import TitledGroup from '../TitledGroup/TitledGroup';

import './SettingsDialog.css';

const SettingsDialog = ({
    open,
    onClose,
    onApply,
    devices,
    selectedSynthOutputID,
    selectedSynthInputID,
    selectedControlInputID,
    onSynthOutputChange,
    onSynthInputChange,
    onControlInputChange,
}) => {
    const closeButtonRef = useRef();
    return (
        <CustomDialog
            title="Settings"
            open={open}
            onClose={onClose}
            initialFocus={closeButtonRef}
        >
            <div className="settingsDialog__content">
                <TitledGroup title="Synth output">
                    <DropDownList
                        onChange={onSynthOutputChange}
                        value={selectedSynthOutputID}
                    >
                        {devices.synthOutputs.map((device) => (
                            <DropDownItem value={device.id} key={device.id}>
                                {device.name}
                            </DropDownItem>
                        ))}
                    </DropDownList>
                </TitledGroup>
                <TitledGroup title="Synth input">
                    <DropDownList
                        onChange={onSynthInputChange}
                        value={selectedSynthInputID}
                    >
                        {devices.synthInputs.map((device) => (
                            <DropDownItem value={device.id} key={device.id}>
                                {device.name}
                            </DropDownItem>
                        ))}
                    </DropDownList>
                </TitledGroup>
                <TitledGroup title="Control input">
                    <DropDownList
                        onChange={onControlInputChange}
                        value={selectedControlInputID}
                    >
                        {devices.controlInputs.map((device) => (
                            <DropDownItem value={device.id} key={device.id}>
                                {device.name}
                            </DropDownItem>
                        ))}
                    </DropDownList>
                </TitledGroup>
                <CustomDialog.ButtonGroup>
                    <CustomDialog.Button isDefault onClick={onApply}>
                        Apply
                    </CustomDialog.Button>
                    <CustomDialog.Button onClick={onClose} ref={closeButtonRef}>
                        Close
                    </CustomDialog.Button>
                </CustomDialog.ButtonGroup>
            </div>
        </CustomDialog>
    );
};

export default SettingsDialog;
