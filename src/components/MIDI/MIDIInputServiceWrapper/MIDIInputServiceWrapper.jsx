import { useCallback, useContext, useMemo, useEffect } from 'react';
import useEventHandler from '../../../hooks/eventHandler';
import { createInputService } from '../../../services/ControlDevices';
import { MIDIOutputServiceContext } from '../MIDIOutputServiceProvider/MIDIOutputServiceProvider';

const MIDIInputServiceWrapper = ({ controlInputPort, onParamChange }) => {
    const outputService = useContext(MIDIOutputServiceContext);

    const handleProcessedMessage = useCallback(
        msg => outputService?.sendMessage(msg),
        [outputService]
    );

    const inputService = useMemo(
        () => controlInputPort && createInputService(controlInputPort),
        [controlInputPort]
    );

    useEffect(() => {
        if (inputService) {
            inputService.onMIDIMessage = handleProcessedMessage;
            inputService.onParamChange = onParamChange;

            return () => {
                inputService.onMIDIMessage = undefined;
                inputService.onParamChange = undefined;
            };
        }
    }, [inputService, handleProcessedMessage, onParamChange]);

    const handleInputMessage = useCallback(
        e => {
            inputService?.processMessage(e.data);
        },
        [inputService]
    );

    useEventHandler(controlInputPort, 'midimessage', handleInputMessage);

    return null;
};

export default MIDIInputServiceWrapper;
