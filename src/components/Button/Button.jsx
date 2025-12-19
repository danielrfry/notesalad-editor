import classNames from 'classnames';
import { useGroupEnabledState } from '../UIGroupEnabledContext/UIGroupEnabledContext';

import './Button.css';

const Button = ({
    extraClasses,
    secondary,
    highlighted,
    small,
    hover,
    onClick,
    children,
    enabled: controlEnabled = true,
    tabIndex,
    ref,
}) => {
    const { enabled, useDisabledStyles } = useGroupEnabledState(controlEnabled);

    return (
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
    );
};

export default Button;
