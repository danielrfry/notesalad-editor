import React from 'react';
import classNames from 'classnames';

import './ScrollArea.css';

const ScrollArea = ({
    scrollV = false,
    scrollH = false,
    extraStyles,
    extraClasses,
    children,
}) => (
    <div
        className={classNames(
            'scroll-area',
            { 'scroll-area--h': scrollH, 'scroll-area--v': scrollV },
            extraClasses
        )}
        style={extraStyles}
    >
        <div className="scroll-area__content">{children}</div>
    </div>
);

export default ScrollArea;
