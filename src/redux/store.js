import { configureStore } from '@reduxjs/toolkit';
import { addSettingsPersistence } from '../services/settingsPersistence';
import patchEditorReducer from './patchEditorSlice';
import settingsReducer from './settingsSlice';
import uiStateReducer from './uiStateSlice';

export const store = configureStore({
    reducer: {
        patchEditor: patchEditorReducer,
        settings: settingsReducer,
        uiState: uiStateReducer,
    },
});

addSettingsPersistence(store);
