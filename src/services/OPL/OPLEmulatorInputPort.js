import { Modes } from '../../types';
import EmulatorInputPortBase from '../EmulatorInputPortBase';

export const DEVICE_ID_OPL_EMULATOR_INPUT = 'uk.danfry.OPL3EmulatorInputPort';

export default class OPLEmulatorInputPort extends EmulatorInputPortBase {
    constructor(emulator) {
        super(emulator);
        this.id = DEVICE_ID_OPL_EMULATOR_INPUT;
        this.name = 'Emulated OPL3';
        this.deviceMode = Modes.OPL;
    }
}
