import React from 'react';
import { useContext } from 'react';

const UIGroupEnabledContext = React.createContext();

export const useGroupEnabledState = enabled => {
    const groupEnabled = useContext(UIGroupEnabledContext);
    return {
        enabled: enabled && (groupEnabled ?? true),
        useDisabledStyles: groupEnabled === undefined,
    };
};

export default UIGroupEnabledContext;
