import _ from 'lodash';
import {
    getMessageData,
    isSysExMessage,
    formatReadParamMessage,
    parseReadParamReply,
    formatIdentifyMessage,
    parseIdentifyReply,
    formatWriteGlobalParamMessage,
    formatStorePatchMessage,
    formatReadPatchMessage,
    getMelodicPatchAddress,
    parseReadPatchReply,
    getDrumPatchAddress,
    getChannelAddress,
    formatWritePatchMessage,
    parseWritePatchReply,
    formatSetDrumModeMessage,
} from '../sysex';
import { timeout } from '../utils';
import patchSchemaManager from './PatchSchemaManager';

const SYSEX_TIMEOUT = 2000;

export default class MIDIOutputService {
    constructor(mode, midiOutput) {
        this.mode = mode;
        this.midiOutput = midiOutput;
        this._sysExHandlers = [];
        this._lastPatch = {};
    }

    sendMessage = message => {
        if (this.midiOutput?.connection === 'open') {
            this.midiOutput.send(message);
        } else {
            console.warn(
                `Sending MIDI message to ${this.midiOutput?.connection} port ${this.midiOutput?.name}`
            );
        }
    };

    noteOn = noteNum => this.sendMessage([0x90, noteNum & 0x7f, 0x7f]);

    noteOff = noteNum => this.sendMessage([0x80, noteNum & 0x7f, 0x7f]);

    controller = (cc, value) => this.sendMessage([0xb0, cc, value]);

    program = program => this.sendMessage([0xc0, program & 0x7f]);

    rpn = (n, value) => {
        const nmsb = (n & 0x3f80) >> 7;
        const nlsb = n & 0x7f;
        const messages = [
            [0xb0, 101, nmsb],
            [0xb0, 100, nlsb],
            [0xb0, 6, (value >> 7) & 0x7f],
            [0xb0, 38, value & 0x7f],
        ];
        this.sendMessage(_.flatten(messages));
    };

    nrpn = (n, value) => {
        const nmsb = (n & 0x3f80) >> 7;
        const nlsb = n & 0x7f;
        const messages = [
            [0xb0, 99, nmsb],
            [0xb0, 98, nlsb],
            [0xb0, 6, (value >> 7) & 0x7f],
            [0xb0, 38, value & 0x7f],
        ];
        this.sendMessage(_.flatten(messages));
    };

    processInputMessage = message => {
        if (isSysExMessage(message)) {
            for (const handler of this._sysExHandlers) {
                handler(message);
            }
        }
    };

    _removeSysExHandler = handler =>
        (this._sysExHandlers = this._sysExHandlers.filter(h => h !== handler));

    _getNextSysExMessage = (filter, abort) =>
        new Promise((resolve, reject) => {
            let abortHandler, cleanUp, messageHandler;
            cleanUp = () => {
                abort.signal.removeEventListener('abort', abortHandler);
                this._removeSysExHandler(messageHandler);
            };
            abortHandler = () => {
                cleanUp();
                reject(new Error('Aborted'));
            };
            messageHandler = message => {
                const messageData = getMessageData(message);
                if (messageData) {
                    const filterResult = filter(messageData);
                    if (filterResult === true) {
                        cleanUp();
                        resolve(messageData);
                    } else if (filterResult !== undefined) {
                        cleanUp();
                        resolve(filterResult);
                    }
                }
            };
            abort.signal.addEventListener('abort', abortHandler);
            this._sysExHandlers.push(messageHandler);
        });

    receiveSysExMessage = async (filter, timeoutMS) => {
        const abort = new AbortController();

        try {
            return await Promise.race([
                timeout(timeoutMS, abort),
                this._getNextSysExMessage(filter, abort),
            ]);
        } finally {
            abort.abort();
        }
    };

    setParamMap = (paramMapIndex, src, destParam, adjustmentAmount) => {
        const baseParam = paramMapIndex * 3 + 0x3000;
        this.nrpn(baseParam, src);
        this.nrpn(baseParam + 1, destParam);
        this.nrpn(baseParam + 2, adjustmentAmount + 0x2000);
    };

    readParam = async (channel, paramID) => {
        this.sendMessage(formatReadParamMessage(channel, paramID));
        return await this.receiveSysExMessage(
            parseReadParamReply(channel, paramID),
            SYSEX_TIMEOUT
        );
    };

    identifyDevice = async () => {
        this.sendMessage(formatIdentifyMessage());
        return await this.receiveSysExMessage(
            parseIdentifyReply(),
            SYSEX_TIMEOUT
        );
    };

    sendPatch = patch => {
        const schema = patchSchemaManager.schemas[this.mode];
        for (let param of schema.params) {
            const { id, path } = param;
            const oldValue = _.get(this._lastPatch, path);
            const newValue = _.get(patch, path);
            if (oldValue !== newValue) {
                this.nrpn(id, newValue);
            }
        }
        this._lastPatch = patch;
    };

    receivePatch = async () => {
        const schema = patchSchemaManager.schemas[this.mode];
        const patch = {};
        for (let param of schema.params) {
            const { id, path } = param;
            _.set(patch, path, await this.readParam(0, id));
        }
        return patch;
    };

    writeGlobalParam = (paramID, value) => {
        this.sendMessage(formatWriteGlobalParamMessage(paramID, value));
    };

    storePatch = (srcChannel, destBank, destProgram) => {
        this.sendMessage(
            formatStorePatchMessage(srcChannel, false, destBank, destProgram)
        );
    };

    storeDrumPatch = (srcChannel, destBank, destProgram, destNoteNum) => {
        this.sendMessage(
            formatStorePatchMessage(
                srcChannel,
                true,
                destBank,
                destProgram,
                destNoteNum
            )
        );
    };

    readPatch = async address => {
        const msg = formatReadPatchMessage(address);
        this.sendMessage(msg);
        return await this.receiveSysExMessage(
            parseReadPatchReply(),
            SYSEX_TIMEOUT
        );
    };

    readMelodicPatch = async (bank, program) =>
        await this.readPatch(getMelodicPatchAddress(bank, program));

    readDrumPatch = async (bank, program, noteNum) =>
        await this.readPatch(getDrumPatchAddress(bank, program, noteNum));

    readChannelPatch = async channel =>
        await this.readPatch(getChannelAddress(channel));

    writePatch = async (destAddress, deviceID, patchData) => {
        const msg = formatWritePatchMessage(destAddress, deviceID, patchData);
        this.sendMessage(msg);
        return await this.receiveSysExMessage(
            parseWritePatchReply(),
            SYSEX_TIMEOUT
        );
    };

    writeMelodicPatch = async (bank, program, deviceID, patchData) =>
        await this.writePatch(
            getMelodicPatchAddress(bank, program),
            deviceID,
            patchData
        );

    writeDrumPatch = async (bank, program, noteNum, deviceID, patchData) =>
        await this.writePatch(
            getDrumPatchAddress(bank, program, noteNum),
            deviceID,
            patchData
        );

    writeChannelPatch = async (channel, deviceID, patchData) =>
        await this.writePatch(getChannelAddress(channel), deviceID, patchData);

    setChannelDrumMode = (channel, drumMode) => {
        const msg = formatSetDrumModeMessage(channel, drumMode);
        this.sendMessage(msg);
    };
}
