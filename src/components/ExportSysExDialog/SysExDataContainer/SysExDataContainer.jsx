import React, { useCallback, useEffect, useState } from 'react';
import SysExData from '../SysExData/SysExData';

const formatHex = n => {
    const s = parseInt(n).toString(16);
    if (s.length < 2) {
        return '0' + s;
    } else {
        return s;
    }
};

const SysExDataContainer = ({ data }) => {
    const dataText = data?.map(formatHex).join(' ');
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopyClick = useCallback(() => {
        navigator.clipboard.writeText(dataText);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 750);
    }, [dataText, setCopySuccess]);

    useEffect(() => {
        if (copySuccess) {
            const timeoutID = setTimeout(() => setCopySuccess(false), 750);
            return () => clearTimeout(timeoutID);
        }
    }, [copySuccess]);

    return (
        <SysExData
            dataText={dataText}
            onCopyClick={handleCopyClick}
            copySuccess={copySuccess}
        ></SysExData>
    );
};

export default SysExDataContainer;
