import EmulatorPortBase from './EmulatorPortBase';

export default class EmulatorInputPortBase extends EmulatorPortBase {
    constructor(emulator) {
        super(emulator);
        this.type = 'input';
    }

    async open() {
        await super.open();
        this._emulator.addEventListener('midimessage', this._handleMIDIMessage);
    }

    async close() {
        this._emulator.removeEventListener(
            'midimessage',
            this._handleMIDIMessage
        );
        await super.close();
    }

    _handleMIDIMessage = e => {
        this.dispatchEvent(e);
    };
}
