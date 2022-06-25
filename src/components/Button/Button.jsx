import React from 'react';
import classNames from 'classnames';

import './Button.css';

const Button = React.forwardRef(
    (
        {
            extraClasses,
            secondary,
            highlighted,
            small,
            hover,
            onClick,
            children,
            enabled,
            tabIndex,
            useDisabledStyles,
        },
        ref
    ) => (
        <button
            ref={ref}
            className={classNames('button', extraClasses, {
                'button--secondary': secondary,
                'button--highlighted': highlighted,
                'button--small': small,
                'button--hover': hover,
                'ui-element--disabled': !enabled && useDisabledStyles,
            })}
            onClick={onClick}
            tabIndex={tabIndex}
            disabled={!enabled}
        >
            {children}
        </button>
    )
);
Button.defaultProps = {
    enabled: true,
    useDisabledStyles: true,
};

export default Button;
