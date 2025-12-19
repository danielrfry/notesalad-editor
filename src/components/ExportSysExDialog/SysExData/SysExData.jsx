import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Transition } from '@headlessui/react';
import Button from '../../Button/Button';

import './SysExData.css';

const SysExData = ({ dataText, onCopyClick, copySuccess }) => (
    <div className="sysExData">
        <div className="sysExData__text">
            <div>{dataText}</div>
        </div>
        <Button
            secondary
            hover
            extraClasses="sysExData__copyButton"
            onClick={onCopyClick}
        >
            <Transition
                className="sysExData__successIndicator"
                show={copySuccess}
                leave="sysExData__successIndicator--leave"
                leaveTo="sysExData__successIndicator--leaveTo"
            >
                <FontAwesomeIcon icon={faCheck} />
            </Transition>
            <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
        </Button>
    </div>
);

export default SysExData;
