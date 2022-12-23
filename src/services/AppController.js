import React from 'react';
import { setPatch } from '../redux/patchEditorSlice';
import { downloadBlob } from '../utils';

export default class AppController {
    constructor(store, midiOutputService) {
        this.store = store;
        this.midiOutputService = midiOutputService;
        this.patchFileBrowserRef = React.createRef();
    }

    openPatchClicked() {
        this.patchFileBrowserRef.current.open();
    }

    async openPatch(files) {
        const patchJSON = await files[0].text();
        const patch = JSON.parse(patchJSON);
        const { mode } = this.store.getState().patchEditor;
        this.store.dispatch(setPatch(mode, patch));
    }

    savePatchClicked() {
        const state = this.store.getState();
        const patchJSON = JSON.stringify(
            state.patchEditor.patch[state.patchEditor.mode]
        );
        const patchBlob = new Blob([patchJSON], { type: 'application/json' });
        downloadBlob(patchBlob, 'patch.json', [
            {
                description: 'JSON files',
                accept: { 'application/json': ['.json'] },
            },
        ]);
    }
}
