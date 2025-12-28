export const selectMode = (state) => state.patchEditor.mode;
export const selectPreferredDevices = (state) =>
    state.settings.preferredDevices;
export const selectPatch = (state) => state.patchEditor.patch;
