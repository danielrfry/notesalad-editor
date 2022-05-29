import _ from 'lodash';
import { useEffect, useMemo } from 'react';

export const useDebounce = (fn, wait) => {
    const debounced = useMemo(() => _.debounce(fn, wait), [fn, wait]);

    useEffect(() => {
        return () => debounced.cancel();
    }, [debounced]);

    return debounced;
};
