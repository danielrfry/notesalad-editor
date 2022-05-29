import { Modes } from '../../types';
import EmulatorOutputPortBase from '../EmulatorOutputPortBase';

export const DEVICE_ID_OPL_EMULATOR_OUTPUT = 'uk.danfry.OPL3EmulatorOutputPort';

export default class OPLEmulatorOutputPort extends EmulatorOutputPortBase {
    constructor(emulator) {
        super(emulator);
        this.id = DEVICE_ID_OPL_EMULATOR_OUTPUT;
        this.name = 'Emulated OPL3';
        this.deviceMode = Modes.OPL;
    }
}
