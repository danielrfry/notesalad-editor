import React from 'react';
import ParamButton from '../Button/ParamButton';
import ConnectionImage from '../ConnectionImage/ConnectionImage';

import './ConnectionButton.css';

const ConnectionButton = ({ path, set, ...others }) => (
    <ParamButton path={path} set={set} extraClasses="conn-button">
        <ConnectionImage path={path} conn={set} {...others}></ConnectionImage>
    </ParamButton>
);

export default ConnectionButton;
