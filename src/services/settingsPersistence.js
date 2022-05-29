import _ from 'lodash';

const SETTINGS_STORAGE_KEY = 'settings';
const MAX_SAVE_FREQUENCY = 500;

export const loadSettings = () => {
    try {
        return JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY));
    } catch (e) {
        console.warn('Failed to load settings from local storage:', e);
    }
};

export const saveSettings = _.throttle(settings => {
    console.debug('Saving settings to local storage');
    try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
        console.warn('Failed to save settings to local storage:', e);
    }
}, MAX_SAVE_FREQUENCY);

export const addSettingsPersistence = store => {
    let prevSettings = store.getState().settings;
    return store.subscribe(() => {
        const newSettings = store.getState().settings;
        if (newSettings !== prevSettings) {
            prevSettings = newSettings;
            saveSettings(newSettings);
        }
    });
};
