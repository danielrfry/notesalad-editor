import { useEffect } from 'react';

const Theme = ({ themeClass }) => {
    useEffect(() => {
        document.body.className = themeClass;
    }, [themeClass]);
    return null;
};

export default Theme;
