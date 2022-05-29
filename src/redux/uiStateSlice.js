import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { PatchAddressTypes } from '../types';

const initialState = {
    settingsDialogOpen: false,
    exportSysExDialog: {
        open: false,
        destinationAddress: {
            type: PatchAddressTypes.Channel,
            channel: 0,
            melodicProgram: {
                bank: 0,
                program: 0,
            },
            drumProgram: {
                bank: 0,
                program: 0,
                noteNum: 35,
            },
        },
    },
    exportSysExDialogOpen: false,
    aboutDialogOpen: false,
};

const uiStateSlice = createSlice({
    name: 'uiState',
    initialState,
    reducers: {
        openSettingsDialog: state => {
            state.settingsDialogOpen = true;
        },
        closeSettingsDialog: state => {
            state.settingsDialogOpen = false;
        },
        openExportSysExDialog: state => {
            state.exportSysExDialogOpen = true;
        },
        closeExportSysExDialog: state => {
            state.exportSysExDialogOpen = false;
        },
        setExportSysExDestinationType: (state, action) => {
            state.exportSysExDialog.destinationAddress.type = action.payload;
        },
        setExportSysExDestChannel: (state, action) => {
            state.exportSysExDialog.destinationAddress.channel = action.payload;
        },
        updateExportSysExDestMelodicProg: (state, action) => {
            _.merge(
                state.exportSysExDialog.destinationAddress.melodicProgram,
                action.payload
            );
        },
        updateExportSysExDestDrumProg: (state, action) => {
            _.merge(
                state.exportSysExDialog.destinationAddress.drumProgram,
                action.payload
            );
        },
        openAboutDialog: state => {
            state.aboutDialogOpen = true;
        },
        closeAboutDialog: state => {
            state.aboutDialogOpen = false;
        },
    },
});

export const {
    openSettingsDialog,
    closeSettingsDialog,
    openExportSysExDialog,
    closeExportSysExDialog,
    setExportSysExDestinationType,
    setExportSysExDestChannel,
    updateExportSysExDestMelodicProg,
    updateExportSysExDestDrumProg,
    openAboutDialog,
    closeAboutDialog,
} = uiStateSlice.actions;
export default uiStateSlice.reducer;
