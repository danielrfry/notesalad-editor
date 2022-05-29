import EmulatorPortBase from './EmulatorPortBase';

export default class EmulatorOutputPortBase extends EmulatorPortBase {
    constructor(emulator) {
        super(emulator);
        this.type = 'output';
    }

    send = data => this._emulator.send(data);

    clear = () => {
        // Not implemented
    };

    resume = async () => await this._emulator.resume();
}
