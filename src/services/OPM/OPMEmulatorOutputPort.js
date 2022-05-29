import { Modes } from '../../types';
import EmulatorOutputPortBase from '../EmulatorOutputPortBase';

export const DEVICE_ID_OPM_EMULATOR_OUTPUT = 'uk.danfry.OPMEmulatorOutputPort';

export default class OPMEmulatorOutputPort extends EmulatorOutputPortBase {
    constructor(emulator) {
        super(emulator);
        this.id = DEVICE_ID_OPM_EMULATOR_OUTPUT;
        this.name = 'Emulated OPM';
        this.deviceMode = Modes.OPM;
    }
}
