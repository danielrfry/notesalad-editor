import React from 'react';
import Button from '../Button/Button';

import './Toolbar.css';

const Toolbar = props => {
    return <div className="toolbar">{props.children}</div>;
};

export const ToolbarItem = React.forwardRef(
    ({ highlighted, onClick, children }, ref) => {
        return (
            <Button
                ref={ref}
                highlighted={highlighted}
                extraClasses="toolbar__item"
                secondary
                hover
                onClick={onClick}
            >
                {children}
            </Button>
        );
    }
);

export default Toolbar;
