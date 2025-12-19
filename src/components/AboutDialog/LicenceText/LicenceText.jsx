import { useEffect, useState } from 'react';

import LICENCE_TEXT from './LicenceText.txt';
import './LicenceText.css';

const LicenceText = () => {
    const [licenceText, setLicenceText] = useState('');

    useEffect(() => {
        (async () => {
            const licenceTextResult = await fetch(LICENCE_TEXT);
            const licenceText = await licenceTextResult.text();
            setLicenceText(licenceText);
        })();
    }, [setLicenceText]);

    return <div className="licenceText">{licenceText}</div>;
};

export default LicenceText;
