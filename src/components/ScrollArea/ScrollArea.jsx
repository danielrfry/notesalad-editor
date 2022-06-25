import React from 'react';
import classNames from 'classnames';

import './ScrollArea.css';
import { useGroupEnabledState } from '../UIGroupEnabledContext/UIGroupEnabledContext';

const ScrollArea = ({
    scrollV = false,
    scrollH = false,
    extraStyles,
    extraClasses,
    children,
}) => {
    const { enabled } = useGroupEnabledState(true);

    return (
        <div
            className={classNames(
                'scroll-area',
                { 'scroll-area--h': scrollH, 'scroll-area--v': scrollV },
                extraClasses
            )}
            style={extraStyles}
            tabIndex={enabled ? undefined : -1}
        >
            <div className="scroll-area__content">{children}</div>
        </div>
    );
};

export default ScrollArea;
