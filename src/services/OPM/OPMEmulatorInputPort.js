import { Modes } from '../../types';
import EmulatorInputPortBase from '../EmulatorInputPortBase';

export const DEVICE_ID_OPM_EMULATOR_INPUT = 'uk.danfry.OPMEmulatorInputPort';

export default class OPMEmulatorInputPort extends EmulatorInputPortBase {
    constructor(emulator) {
        super(emulator);
        this.id = DEVICE_ID_OPM_EMULATOR_INPUT;
        this.name = 'Emulated OPM';
        this.deviceMode = Modes.OPM;
    }
}
