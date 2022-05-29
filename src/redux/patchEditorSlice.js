import { createSlice } from '@reduxjs/toolkit';
import patchSchemaManager from '../services/PatchSchemaManager';
import { isSD1Patch4Op } from '../services/SD1/SD1PatchSchema';
import { Modes } from '../types';

const initialState = {
    mode: Modes.OPL,
    patch: {
        [Modes.OPL]: patchSchemaManager.createPatch(Modes.OPL),
        [Modes.OPM]: patchSchemaManager.createPatch(Modes.OPM),
        [Modes.SD1]: patchSchemaManager.createPatch(Modes.SD1),
    },
};

export const patchEditorSlice = createSlice({
    name: 'patchEditor',
    initialState,
    reducers: {
        setPatchParam: {
            reducer: (state, action) => {
                patchSchemaManager.setParamValue(
                    action.payload.path,
                    state.patch,
                    action.payload.value
                );
            },
            prepare: (path, value) => ({ payload: { path, value } }),
        },
        setPatchParamFromCC: {
            reducer: (state, action) => {
                patchSchemaManager.setParamValueFromCC(
                    action.payload.path,
                    state.patch,
                    action.payload.value
                );
            },
            prepare: (path, value) => ({ payload: { path, value } }),
        },
        togglePatchParam: (state, action) => {
            const newValue = !patchSchemaManager.getParamValue(
                action.payload,
                state.patch
            )
                ? 1
                : 0;
            patchSchemaManager.setParamValue(
                action.payload,
                state.patch,
                newValue
            );
        },
        togglePatchParamBit: {
            reducer: (state, action) => {
                const newValue =
                    patchSchemaManager.getParamValue(
                        action.payload.path,
                        state.patch
                    ) ^ action.payload.bit;
                patchSchemaManager.setParamValue(
                    action.payload.path,
                    state.patch,
                    newValue
                );
            },
            prepare: (path, bit) => ({ payload: { path, bit } }),
        },
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        setPatch: {
            reducer: (state, action) => {
                const { mode, patchJSON } = action.payload;
                const patch = patchSchemaManager.createPatch(mode, patchJSON);
                state.patch[mode] = patch;
            },
            prepare: (mode, patchJSON) => ({ payload: { mode, patchJSON } }),
        },
        setSD1Patch4Op: (state, action) => {
            const is4Op = isSD1Patch4Op(state.patch[Modes.SD1]);
            if (is4Op !== action.payload) {
                if (action.payload) {
                    state.patch[Modes.SD1].alg = 2;
                } else {
                    state.patch[Modes.SD1].alg = 0;
                }
            }
        },
        setOPLPatch4Op: (state, action) => {
            const patch = state.patch[Modes.OPL];
            if (!!patch.is4Op !== action.payload) {
                patch.is4Op = action.payload ? 1 : 0;
                patch.conn = 0;
            }
        },
    },
});

export const {
    setPatchParam,
    setPatchParamFromCC,
    togglePatchParam,
    togglePatchParamBit,
    setMode,
    setPatch,
    setSD1Patch4Op,
    setOPLPatch4Op,
} = patchEditorSlice.actions;
export default patchEditorSlice.reducer;
