import _ from 'lodash';

export const shallowCompare = (obj1, obj2) => {
    if (typeof obj1 !== typeof obj2) {
        return false;
    }
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    for (let key of keys) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
};

export const clamp = (min, max, value) => {
    return Math.max(min, Math.min(Math.round(value), max));
};

export const debounceAsync = fn => {
    let running = false;
    let pending = false;

    return async (...args) => {
        if (running) {
            pending = true;
        } else {
            while (pending) {
                pending = false;
                await fn(...args);
            }
        }
    };
};

export const delay = (timeMS, abort) =>
    new Promise((resolve, reject) => {
        let timeoutCookie, abortHandler;
        const cleanUp = () => {
            if (abort) {
                abort.signal.removeEventListener('abort', abortHandler);
            }
            if (timeoutCookie !== undefined) {
                clearTimeout(timeoutCookie);
            }
        };
        abortHandler = () => {
            cleanUp();
            reject(new Error('Aborted'));
        };
        if (abort) {
            abort.signal.addEventListener('abort', abortHandler);
        }
        timeoutCookie = setTimeout(() => {
            timeoutCookie = undefined;
            cleanUp();
            resolve();
        }, timeMS);
    });

export const timeout = async (timeMS, abort) => {
    await delay(timeMS, abort);
    throw new Error('Timed out');
};

export const arraySliceEquals = (array, slice, startOffset) => {
    startOffset = startOffset || 0;
    for (let i = 0; i < slice.length; i++) {
        if (array[i + startOffset] !== slice[i]) {
            return false;
        }
    }
    return true;
};

export const downloadBlob = (blob, fileName) => {
    const objectURL = URL.createObjectURL(blob);
    setTimeout(() => URL.revokeObjectURL(objectURL), 60000);
    const aEl = document.createElement('a');
    aEl.setAttribute('download', fileName);
    aEl.setAttribute('href', objectURL);
    aEl.click();
};
