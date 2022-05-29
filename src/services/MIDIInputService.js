export default class MIDIInputService {
    constructor(ctlMap) {
        this.started = false;
        this.onMIDIMessage = null;
        this.onParamChange = null;
        this.ctlMap = ctlMap;
    }

    processMessage = message => {
        const transformed = this._transformMessage(message);
        if (transformed) {
            this._raiseMIDIMessage(transformed);
        }
    };

    _transformMessage(message) {
        if (!message || message.length < 1) {
            return null;
        }

        const messageType = message[0] & 0xf0;

        if (messageType === 0xb0) {
            const [, cc, value] = message;

            if (this.ctlMap && cc in this.ctlMap) {
                this._raiseParamChange(this.ctlMap[cc], value);
                return null;
            }

            if (cc >= 16 && cc < 54) {
                return null;
            } else {
                return message;
            }
        }

        return message;
    }

    _raiseMIDIMessage = message => {
        if (this.onMIDIMessage) {
            this.onMIDIMessage(message);
        }
    };

    _raiseParamChange = (param, value) => {
        if (this.onParamChange) {
            this.onParamChange(param, value);
        }
    };
}
