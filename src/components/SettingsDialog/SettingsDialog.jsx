import React from 'react';
import Dialog from '../CustomDialog/CustomDialog';
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
}) => (
    <Dialog title="Settings" open={open} onClose={onClose}>
        <div className="settingsDialog__content">
            <TitledGroup title="Synth output">
                <DropDownList
                    onChange={onSynthOutputChange}
                    value={selectedSynthOutputID}
                >
                    {devices.synthOutputs.map(device => (
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
                    {devices.synthInputs.map(device => (
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
                    {devices.controlInputs.map(device => (
                        <DropDownItem value={device.id} key={device.id}>
                            {device.name}
                        </DropDownItem>
                    ))}
                </DropDownList>
            </TitledGroup>
            <Dialog.ButtonGroup>
                <Dialog.Button isDefault onClick={onApply}>
                    Apply
                </Dialog.Button>
                <Dialog.Button onClick={onClose}>Close</Dialog.Button>
            </Dialog.ButtonGroup>
        </div>
    </Dialog>
);

export default SettingsDialog;
