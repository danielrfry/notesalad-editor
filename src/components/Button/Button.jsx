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
                'ui-element--disabled': !enabled,
            })}
            onClick={onClick}
        >
            {children}
        </button>
    )
);
Button.defaultProps = {
    enabled: true,
};

export default Button;
