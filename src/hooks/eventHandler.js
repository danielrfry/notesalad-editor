import { useEffect } from 'react';

const useEventHandler = (target, eventType, handler) => {
    useEffect(() => {
        if (target && eventType && handler) {
            target.addEventListener(eventType, handler);
            return () => target.removeEventListener(eventType, handler);
        }
    }, [target, eventType, handler]);
};

export default useEventHandler;
