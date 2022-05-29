import { arraySliceEquals } from './utils';

export const SYSEX_MANUFACTURER_ID = [0x00, 0x22, 0x53];

export const SYSEX_CMD_IDENTIFY = 0x01;
export const SYSEX_CMD_IDENTIFY_REPLY = 0x02;
export const SYSEX_CMD_READPARAM = 0x03;
export const SYSEX_CMD_READPARAM_REPLY = 0x04;
export const SYSEX_CMD_WRITEGLOBALPARAM = 0x05;
export const SYSEX_CMD_STOREPATCH = 0x06;
export const SYSEX_CMD_READPATCH = 0x07;
export const SYSEX_CMD_READPATCH_REPLY = 0x08;
export const SYSEX_CMD_WRITEPATCH = 0x09;
export const SYSEX_CMD_WRITEPATCH_REPLY = 0x0a;

export const SYSEX_PATCHADDR_TYPE_CHANNEL = 0x00;
export const SYSEX_PATCHADDR_TYPE_MELODICPROG = 0x01;
export const SYSEX_PATCHADDR_TYPE_DRUMPROG = 0x02;

export const SYSEX_READPATCH_RESULTCODE_OK = 0x00;
export const SYSEX_READPATCH_RESULTCODE_NOPATCH = 0x01;
export const SYSEX_READPATCH_RESULTCODE_BUFFEROVERFLOW = 0x02;

export const SYSEX_WRITEPATCH_RESULTCODE_OK = 0x00;
export const SYSEX_WRITEPATCH_RESULTCODE_INCORRECTDEVICEID = 0x01;
export const SYSEX_WRITEPATCH_RESULTCODE_INVALIDPATCHDATA = 0x02;
export const SYSEX_WRITEPATCH_RESULTCODE_NOSPACE = 0x04;

export const isSysExMessage = message =>
    message[0] === 0xf0 && checkManufacturerID(message);

export const checkManufacturerID = message =>
    arraySliceEquals(message, SYSEX_MANUFACTURER_ID, 1);

export const getMessageData = message => {
    if (message[0] === 0xf0 && checkManufacturerID(message)) {
        return message.slice(SYSEX_MANUFACTURER_ID.length + 1, -1);
    } else {
        return undefined;
    }
};

const messageFormatter = dataFormatter => (...args) => {
    return [0xf0, ...SYSEX_MANUFACTURER_ID, ...dataFormatter(...args), 0xf7];
};

export const formatReadParamMessage = messageFormatter((channel, paramID) => {
    const paramMSB = (paramID >> 7) & 0x7f;
    const paramLSB = paramID & 0x7f;
    return [SYSEX_CMD_READPARAM, channel & 0x7f, paramLSB, paramMSB];
});

export const parseReadParamReply = (channel, paramID) => {
    const paramMSB = (paramID >> 7) & 0x7f;
    const paramLSB = paramID & 0x7f;
    const expected = [SYSEX_CMD_READPARAM_REPLY, channel, paramLSB, paramMSB];
    return messageData => {
        if (arraySliceEquals(messageData, expected)) {
            const valueLSB = messageData[4];
            const valueMSB = messageData[5];
            return (valueMSB << 7) | valueLSB;
        } else {
            return undefined;
        }
    };
};

export const formatIdentifyMessage = messageFormatter(() => {
    return [SYSEX_CMD_IDENTIFY];
});

export const parseIdentifyReply = () => messageData => {
    if (messageData[0] === SYSEX_CMD_IDENTIFY_REPLY) {
        return messageData[1];
    } else {
        return undefined;
    }
};

export const formatWriteGlobalParamMessage = messageFormatter(
    (paramID, value) => {
        const paramMSB = (paramID >> 7) & 0x7f;
        const paramLSB = paramID & 0x7f;
        const valueMSB = (value >> 7) & 0x7f;
        const valueLSB = value & 0x7f;
        return [
            SYSEX_CMD_WRITEGLOBALPARAM,
            paramLSB,
            paramMSB,
            valueLSB,
            valueMSB,
        ];
    }
);

export const formatStorePatchMessage = messageFormatter(
    (srcChannel, isDrumPatch, destBank, destProgram, destNoteNum = 0) => {
        const flags = isDrumPatch ? 1 : 0;
        return [
            SYSEX_CMD_STOREPATCH,
            srcChannel,
            flags,
            destBank,
            destProgram,
            destNoteNum,
        ];
    }
);

export const getChannelAddress = channel => ({
    type: SYSEX_PATCHADDR_TYPE_CHANNEL,
    channel,
});

export const getMelodicPatchAddress = (bank, program) => ({
    type: SYSEX_PATCHADDR_TYPE_MELODICPROG,
    bank,
    program,
});

export const getDrumPatchAddress = (bank, program, noteNum) => ({
    type: SYSEX_PATCHADDR_TYPE_DRUMPROG,
    bank,
    program,
    noteNum,
});

const formatPatchAddress = address => {
    const { type } = address;
    if (type === SYSEX_PATCHADDR_TYPE_CHANNEL) {
        return [SYSEX_PATCHADDR_TYPE_CHANNEL, address.channel, 0, 0];
    } else if (type === SYSEX_PATCHADDR_TYPE_MELODICPROG) {
        return [
            SYSEX_PATCHADDR_TYPE_MELODICPROG,
            address.bank,
            address.program,
            0,
        ];
    } else if (type === SYSEX_PATCHADDR_TYPE_DRUMPROG) {
        return [
            SYSEX_PATCHADDR_TYPE_DRUMPROG,
            address.bank,
            address.program,
            address.noteNum,
        ];
    } else {
        return [0, 0, 0, 0];
    }
};

export const formatReadPatchMessage = messageFormatter(srcAddress => {
    return [SYSEX_CMD_READPATCH, ...formatPatchAddress(srcAddress)];
});

export const parseReadPatchReply = () => messageData => {
    if (messageData[0] === SYSEX_CMD_READPATCH_REPLY) {
        if (messageData.length < 2) {
            return undefined;
        }
        const resultCode = messageData[1];
        if (resultCode === SYSEX_READPATCH_RESULTCODE_OK) {
            return {
                resultCode,
                deviceID: messageData[2],
                patchData: messageData.slice(3),
            };
        } else {
            return { resultCode };
        }
    } else {
        return undefined;
    }
};

export const formatWritePatchMessage = messageFormatter(
    (destAddress, deviceID, patchData) => {
        return [
            SYSEX_CMD_WRITEPATCH,
            ...formatPatchAddress(destAddress),
            deviceID,
            ...patchData,
        ];
    }
);

export const parseWritePatchReply = () => messageData => {
    if (messageData[0] === SYSEX_CMD_WRITEPATCH_REPLY) {
        if (messageData.length < 2) {
            return undefined;
        }
        const resultCode = messageData[1];
        return resultCode;
    } else {
        return undefined;
    }
};
