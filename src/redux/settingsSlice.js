import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
    DEVICE_ID_AUTO,
    DEVICE_NAME_AUTO,
} from '../services/MIDIDeviceSelector';
import { loadSettings } from '../services/settingsPersistence';
import { Modes } from '../types';

const defaultState = {
    preferredDevices: _.fromPairs(
        Object.values(Modes).map(mode => [
            mode,
            {
                synthInput: { id: DEVICE_ID_AUTO, name: DEVICE_NAME_AUTO },
                synthOutput: { id: DEVICE_ID_AUTO, name: DEVICE_NAME_AUTO },
                controlInput: { id: DEVICE_ID_AUTO, name: DEVICE_NAME_AUTO },
            },
        ])
    ),
};

const initialState = {
    ...defaultState,
    ...loadSettings(),
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setPreferredDevices: {
            reducer: (state, action) => {
                const { mode, newPreferredDevices } = action.payload;
                state.preferredDevices[mode] = newPreferredDevices;
            },
            prepare: (mode, newPreferredDevices) => ({
                payload: {
                    mode,
                    newPreferredDevices,
                },
            }),
        },
    },
});

export const { setPreferredDevices } = settingsSlice.actions;
export default settingsSlice.reducer;
