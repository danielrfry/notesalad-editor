import EmulatorBase from '../EmulatorBase';
import { OPLNodeWrapper } from '@danielrfry/notesalad';

export default class OPLEmulator extends EmulatorBase {
    _createEmulatorNodeWrapper = audioContext =>
        new OPLNodeWrapper(audioContext);
}
