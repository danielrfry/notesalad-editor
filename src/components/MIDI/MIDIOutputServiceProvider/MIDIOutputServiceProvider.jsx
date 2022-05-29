import React, { useCallback, useMemo } from 'react';
import useEventHandler from '../../../hooks/eventHandler';
import MIDIOutputService from '../../../services/MIDIOutputService';

export const MIDIOutputServiceContext = React.createContext();

const MIDIOutputServiceProvider = ({
    synthInputPort,
    synthOutputPort,
    mode,
    enabled,
    children,
}) => {
    const outputService = useMemo(() => {
        if (enabled) {
            const newOutputService = new MIDIOutputService(
                mode,
                synthOutputPort
            );
            return newOutputService;
        }
    }, [synthOutputPort, mode, enabled]);

    const handleMIDIMessage = useCallback(
        e => {
            if (outputService) {
                outputService.processInputMessage(e.data);
            }
        },
        [outputService]
    );

    useEventHandler(synthInputPort, 'midimessage', handleMIDIMessage);

    return (
        <MIDIOutputServiceContext.Provider value={outputService}>
            {children}
        </MIDIOutputServiceContext.Provider>
    );
};
MIDIOutputServiceProvider.defaultProps = {
    synthInputPort: undefined,
    synthOutputPort: undefined,
    enabled: false,
};

export default MIDIOutputServiceProvider;
