import classNames from 'classnames';
import React, { useCallback } from 'react';

import './DropDownList.css';

const DropDownList = ({
    value,
    onChange,
    extraClasses,
    enabled = true,
    tabIndex,
    children,
}) => {
    const handleChange = useCallback(
        e => {
            onChange?.(e.target.value);
        },
        [onChange]
    );

    return (
        <select
            className={classNames('drop-down-list', extraClasses)}
            value={value}
            onChange={handleChange}
            disabled={!enabled}
            tabIndex={tabIndex}
        >
            {children}
        </select>
    );
};

export const DropDownItem = ({ value, children }) => (
    <option value={value}>{children}</option>
);

export default DropDownList;
