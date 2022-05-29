import React, { useCallback, useEffect, useState } from 'react';
import MIDIInputServiceContainer from '../MIDIInputServiceContainer/MIDIInputServiceContainer';
import MIDIOutputServiceProvider from '../MIDIOutputServiceProvider/MIDIOutputServiceProvider';
import MIDIPortConnection from '../MIDIPortConnection/MIDIPortConnection';

const getReadyState = (synthInputPortState, synthOutputPortState) =>
    synthInputPortState === 'open' && synthOutputPortState === 'open';
const getSuspendedState = synthOutputPortState =>
    synthOutputPortState === 'suspended';

const MIDIEnvironment = ({
    synthInputPort,
    synthOutputPort,
    controlInputPort,
    mode,
    onReadyChanged,
    onSuspendedChanged,
    children,
}) => {
    const [synthInputPortState, setSynthInputPortState] = useState('closed');
    const [synthOutputPortState, setSynthOutputPortState] = useState('closed');

    const handleInputPortStateChanged = useCallback(() => {
        setSynthInputPortState(synthInputPort?.connection || 'closed');
    }, [synthInputPort, setSynthInputPortState]);

    const handleOutputPortStateChanged = useCallback(() => {
        setSynthOutputPortState(synthOutputPort?.connection || 'closed');
    }, [synthOutputPort, setSynthOutputPortState]);

    useEffect(() => {
        const ready = getReadyState(synthInputPortState, synthOutputPortState);
        const suspended = getSuspendedState(synthOutputPortState);
        onReadyChanged(ready);
        onSuspendedChanged(suspended);
    }, [
        synthInputPortState,
        synthOutputPortState,
        onReadyChanged,
        onSuspendedChanged,
    ]);

    const ready = getReadyState(
        synthInputPort?.connection,
        synthOutputPort?.connection
    );
    return (
        <>
            <MIDIPortConnection
                port={synthInputPort}
                onPortStateChanged={handleInputPortStateChanged}
            />
            <MIDIPortConnection
                port={synthOutputPort}
                onPortStateChanged={handleOutputPortStateChanged}
            />
            <MIDIPortConnection port={controlInputPort} />
            <MIDIOutputServiceProvider
                synthInputPort={synthInputPort}
                synthOutputPort={synthOutputPort}
                mode={mode}
                enabled={ready}
            >
                <MIDIInputServiceContainer
                    controlInputPort={controlInputPort}
                />
                {children}
            </MIDIOutputServiceProvider>
        </>
    );
};

MIDIEnvironment.defaultProps = {
    synthInputPort: undefined,
    synthOutputPort: undefined,
    controlInputPort: undefined,
    mode: undefined,
    onReadyChanged: _ => {},
    onSuspendedChanged: _ => {},
};

export default MIDIEnvironment;
