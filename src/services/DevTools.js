import {
    formatWritePatchMessage,
    getChannelAddress,
    getDrumPatchAddress,
    getMelodicPatchAddress,
} from '../sysex';

export default class DevTools {
    formatWritePatchMessage = formatWritePatchMessage;
    getMelodicPatchAddress = getMelodicPatchAddress;
    getDrumPatchAddress = getDrumPatchAddress;
    getChannelAddress = getChannelAddress;

    constructor(store, outputService) {
        this.store = store;
        this.outputService = outputService;
    }

    get out() {
        return this.outputService;
    }

    get patch() {
        const state = this.store.getState();
        const { mode } = state.patchEditor;
        return state.patchEditor.patch[mode];
    }
}
