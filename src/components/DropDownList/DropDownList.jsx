import classNames from 'classnames';
import React, { useCallback } from 'react';

import './DropDownList.css';

const DropDownList = ({ value, onChange, extraClasses, children }) => {
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
        >
            {children}
        </select>
    );
};

export const DropDownItem = ({ value, children }) => (
    <option value={value}>{children}</option>
);

export default DropDownList;
