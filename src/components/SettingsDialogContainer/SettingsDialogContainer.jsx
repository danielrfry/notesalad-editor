import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPreferredDevices } from '../../redux/settingsSlice';
import { closeSettingsDialog } from '../../redux/uiStateSlice';
import {
    DEVICE_ID_AUTO,
    DEVICE_ID_NONE,
    DEVICE_NAME_NONE,
    getDefaultMIDIDevices,
} from '../../services/MIDIDeviceSelector';
import SettingsDialog from '../SettingsDialog/SettingsDialog';
import { selectMode, selectPreferredDevices } from '../../redux/selectors';

const DEVICE_NONE = { id: DEVICE_ID_NONE, name: DEVICE_NAME_NONE };

const filterDeviceList = (deviceList, mode) => {
    const autoDevices = getDefaultMIDIDevices(deviceList, mode);
    return {
        synthOutputs: [
            {
                id: DEVICE_ID_AUTO,
                name: `(Auto: ${autoDevices.synthOutputPort?.name ?? 'none'})`,
            },
            DEVICE_NONE,
            ...deviceList.outputs.filter(
                (dev) => dev.deviceMode === undefined || dev.deviceMode === mode
            ),
        ],
        synthInputs: [
            {
                id: DEVICE_ID_AUTO,
                name: `(Auto: ${autoDevices.synthInputPort?.name ?? 'none'})`,
            },
            DEVICE_NONE,
            ...deviceList.inputs.filter(
                (dev) => dev.deviceMode === undefined || dev.deviceMode === mode
            ),
        ],
        controlInputs: [
            {
                id: DEVICE_ID_AUTO,
                name: `(Auto: ${autoDevices.controlInputPort?.name ?? 'none'})`,
            },
            DEVICE_NONE,
            ...deviceList.inputs.filter(
                (dev) =>
                    !dev.isEmulator &&
                    (dev.deviceMode === undefined || dev.deviceMode === mode)
            ),
        ],
    };
};

const findDeviceByID = (deviceList, id) =>
    deviceList.find((dev) => dev.id === id);

const findDeviceByName = (deviceList, name) =>
    deviceList.find((dev) => dev.name === name);

const getDeviceInfoByID = (deviceList, id) => {
    const device = findDeviceByID(deviceList, id);
    return device ? { id: device.id, name: device.name } : {};
};

const selectDialogOpen = (state) => state.uiState.settingsDialogOpen;

const SettingsDialogContainer = ({
    devices,
}) => {
    const dispatch = useDispatch();
    const mode = useSelector(selectMode);
    const open = useSelector(selectDialogOpen);
    const preferredDevices = useSelector(selectPreferredDevices);

    const [selectedSynthOutputID, setSelectedSynthOutputID] = useState();
    const [selectedSynthInputID, setSelectedSynthInputID] = useState();
    const [selectedControlInputID, setSelectedControlInputID] = useState();

    useEffect(() => {
        if (open) {
            setSelectedSynthOutputID(preferredDevices[mode].synthOutput.id);
            setSelectedSynthInputID(preferredDevices[mode].synthInput.id);
            setSelectedControlInputID(preferredDevices[mode].controlInput.id);
        }
    }, [
        open,
        mode,
        preferredDevices,
        setSelectedSynthOutputID,
        setSelectedSynthInputID,
        setSelectedControlInputID,
    ]);

    const filteredDevices = useMemo(
        () => filterDeviceList(devices, mode),
        [devices, mode]
    );

    const handleApplyClicked = useCallback(() => {
        const newPreferredDevices = {
            synthOutput: getDeviceInfoByID(
                filteredDevices.synthOutputs,
                selectedSynthOutputID
            ),
            synthInput: getDeviceInfoByID(
                filteredDevices.synthInputs,
                selectedSynthInputID
            ),
            controlInput: getDeviceInfoByID(
                filteredDevices.controlInputs,
                selectedControlInputID
            ),
        };
        dispatch(setPreferredDevices(mode, newPreferredDevices));
    }, [
        mode,
        filteredDevices,
        selectedSynthOutputID,
        selectedSynthInputID,
        selectedControlInputID,
        dispatch]);

    const handleSynthOutputChanged = useCallback(
        (newSynthOutputID) => {
            setSelectedSynthOutputID(newSynthOutputID);

            // Try to find a corresponding input by name:
            const newSynthOutputInfo = getDeviceInfoByID(
                filteredDevices.synthOutputs,
                newSynthOutputID
            );
            const newSynthInputID = findDeviceByName(
                filteredDevices.synthInputs,
                newSynthOutputInfo.name
            )?.id;
            if (newSynthInputID !== undefined) {
                setSelectedSynthInputID(newSynthInputID);
            }
        },
        [setSelectedSynthOutputID, filteredDevices, setSelectedSynthInputID]
    );

    const handleCloseClicked = useCallback(() => dispatch(closeSettingsDialog()), [dispatch]);

    return (
        <SettingsDialog
            open={open}
            onClose={handleCloseClicked}
            onApply={handleApplyClicked}
            devices={filteredDevices}
            onSynthOutputChange={handleSynthOutputChanged}
            onSynthInputChange={setSelectedSynthInputID}
            onControlInputChange={setSelectedControlInputID}
            selectedSynthOutputID={selectedSynthOutputID}
            selectedSynthInputID={selectedSynthInputID}
            selectedControlInputID={selectedControlInputID}
        />
    );
};

export default SettingsDialogContainer;
