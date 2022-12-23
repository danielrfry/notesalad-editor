import React from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { useStore } from 'react-redux';
import AppController from '../../services/AppController';
import { MIDIOutputServiceContext } from '../MIDI/MIDIOutputServiceProvider/MIDIOutputServiceProvider';

export const AppControllerContext = React.createContext();

const AppControllerProvider = ({ children }) => {
    const store = useStore();
    const midiOutputService = useContext(MIDIOutputServiceContext);
    const appController = useMemo(
        () => new AppController(store, midiOutputService),
        [store, midiOutputService]
    );
    return (
        <AppControllerContext.Provider value={appController}>
            {children}
        </AppControllerContext.Provider>
    );
};

export default AppControllerProvider;
