import AsyncLock from 'async-lock/lib';
import EventTarget from 'event-target-shim';
import { initAudioContext } from '@danielrfry/notesalad';
import { createAudioContext } from '../audioUtils';

export const EMULATOR_STATE_CLOSED = 'closed';
export const EMULATOR_STATE_SUSPENDED = 'suspended';
export const EMULATOR_STATE_RUNNING = 'running';

const LIBNOTESALAD_PATH = '/static/js/libnotesalad.js';

export default class EmulatorBase extends EventTarget {
    constructor() {
        super();
        this.audioContext = null;
        this.state = EMULATOR_STATE_CLOSED;
        this._acquireCount = 0;
        this.emulatorNodeWrapper = null;
        this._lock = new AsyncLock();
    }

    acquire = async () => {
        this._acquireCount++;
        await this._open();
    };

    release = async () => {
        if (this._acquireCount > 0) {
            this._acquireCount--;
        }
        if (this._acquireCount === 0) {
            await this._close();
        }
    };

    _getState = () => {
        if (this.audioContext) {
            if (this.audioContext.state === 'suspended') {
                return EMULATOR_STATE_SUSPENDED;
            } else {
                return EMULATOR_STATE_RUNNING;
            }
        } else {
            return EMULATOR_STATE_CLOSED;
        }
    };

    _updateState = () => {
        const newState = this._getState();
        if (this.state !== newState) {
            this.state = newState;
            const e = new Event('statechange');
            e.sender = this;
            e.state = this.state;
            this.dispatchEvent(e);
        }
    };

    _open = async () =>
        await this._lock.acquire('openclose', async () => {
            const state = this._getState();
            if (state === EMULATOR_STATE_CLOSED) {
                await this._doOpen();
                this._updateState();
            }
        });

    _doOpen = async () => {
        this.audioContext = createAudioContext(this._getAudioContextOptions());
        await initAudioContext(this.audioContext, LIBNOTESALAD_PATH);
        this.audioContext.onstatechange = this._updateState;

        this.emulatorNodeWrapper = this._createEmulatorNodeWrapper(
            this.audioContext
        );
        this.emulatorNodeWrapper.node.connect(this.audioContext.destination);

        this.emulatorNodeWrapper.onReceiveMIDI = this._handleReceiveMIDI;
    };

    _close = async () =>
        await this._lock.acquire('openclose', async () => {
            const state = this._getState();
            if (state !== EMULATOR_STATE_CLOSED) {
                await this._doClose();
                this._updateState();
            }
        });

    _doClose = async () => {
        this.emulatorNodeWrapper.close();
        this.emulatorNodeWrapper.node.disconnect();
        this.emulatorNodeWrapper = null;
        this.audioContext.onstatechange = null;
        await this.audioContext.close();
        this.audioContext = null;
    };

    resume = async () =>
        await this._lock.acquire('openclose', async () => {
            if (this.state === EMULATOR_STATE_SUSPENDED) {
                await this.audioContext.resume();
            }
        });

    send = data => this.emulatorNodeWrapper.writeMIDI([{ time: 0, data }]);

    _createEmulatorNodeWrapper = () => {
        // Abstract
    };

    _getAudioContextOptions() {
        return { sampleRate: 48000 };
    }

    _handleReceiveMIDI = msgData => {
        const e = new Event('midimessage');
        e.receivedTime = performance.now();
        e.data = msgData;
        this.dispatchEvent(e);
    };
}
