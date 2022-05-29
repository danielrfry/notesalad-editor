import EventTarget from 'event-target-shim';
import {
    EMULATOR_STATE_CLOSED,
    EMULATOR_STATE_RUNNING,
    EMULATOR_STATE_SUSPENDED,
} from './EmulatorBase';

export default class EmulatorPortBase extends EventTarget {
    constructor(emulator) {
        super();
        this._emulator = emulator;
        this.id = 'uk.danfry.EmulatorPort';
        this.manufacturer = '';
        this.name = 'Emulated MIDI Output';
        this.version = null;
        this.state = 'connected';
        this.connection = 'closed';
        this.audioContext = null;
        this.isEmulator = true;
        this.deviceMode = undefined;
        this._emulator.addEventListener('statechange', () =>
            this._updateConnection()
        );
    }

    async open() {
        await this._emulator.acquire();
        this._updateConnection();
        return this;
    }

    async close() {
        await this._emulator.release();
        this._updateConnection();
        return this;
    }

    _setConnection = newValue => {
        if (newValue !== this.connection) {
            this.connection = newValue;
            const e = new Event('statechange');
            e.port = this;
            this.dispatchEvent(e);
        }
    };

    _updateConnection = () => {
        switch (this._emulator.state) {
            case EMULATOR_STATE_CLOSED:
                this._setConnection('closed');
                break;
            case EMULATOR_STATE_RUNNING:
                this._setConnection('open');
                break;
            case EMULATOR_STATE_SUSPENDED:
                this._setConnection('suspended');
                break;
            default:
                break;
        }
    };
}
