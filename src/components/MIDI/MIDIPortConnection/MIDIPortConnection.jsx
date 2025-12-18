import { useEffect } from 'react';

const MIDIPortConnection = ({ port = undefined, onPortStateChanged = () => {} }) => {
    useEffect(() => {
        if (port) {
            console.info(
                `Opening MIDI ${port.type} port %c${port.name}`,
                'font-weight: bold'
            );
            port.open();
            return () => {
                console.info(
                    `Closing MIDI ${port.type} port %c${port.name}`,
                    'font-weight: bold'
                );
                port.close();
            };
        } else if (onPortStateChanged) {
            onPortStateChanged();
        }
    }, [port, onPortStateChanged]);

    useEffect(() => {
        if (port && onPortStateChanged) {
            const handleStateChange = () => {
                onPortStateChanged(port.connection);
            };
            port.addEventListener('statechange', handleStateChange);

            handleStateChange();

            return () => {
                port.removeEventListener('statechange', handleStateChange);
            };
        }
    }, [port, onPortStateChanged]);

    return null;
};

export default MIDIPortConnection;
