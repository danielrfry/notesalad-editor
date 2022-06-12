import EmulatorBase from '../EmulatorBase';
import { OPMNodeWrapper } from '@danielrfry/notesalad';

export default class OPMEmulator extends EmulatorBase {
    _createEmulatorNodeWrapper = audioContext =>
        new OPMNodeWrapper(audioContext);

    _getAudioContextOptions() {
        return {
            ...super._getAudioContextOptions(),
            sampleRate: 55930,
        };
    }
}
