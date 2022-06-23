import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from '@headlessui/react';
import React from 'react';

import './CustomMenu.css';

const CustomMenu = React.forwardRef((props, ref) => (
    <div ref={ref} className="custom-menu">
        {props.children}
    </div>
));

const CustomMenuItem = ({ children, icon, onClick }) => (
    <Popover.Button as="button" className="custom-menu-item" onClick={onClick}>
        {icon && (
            <div className="custom-menu-item__icon">
                <FontAwesomeIcon icon={icon} />
            </div>
        )}
        <div className="custom-menu-item__content">{children}</div>
    </Popover.Button>
);

export default CustomMenu;

export { CustomMenuItem };
