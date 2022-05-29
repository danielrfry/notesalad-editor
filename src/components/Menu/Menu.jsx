import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from '@headlessui/react';
import React from 'react';

import './Menu.css';

const Menu = React.forwardRef((props, ref) => (
    <div ref={ref} className="menu">
        {props.children}
    </div>
));

const MenuItem = ({ children, icon, onClick }) => (
    <Popover.Button as="div" className="menu-item">
        <div onClick={onClick}>
            {icon && (
                <div className="menu-item__icon">
                    <FontAwesomeIcon icon={icon} />
                </div>
            )}
            <div className="menu-item__content">{children}</div>
        </div>
    </Popover.Button>
);

export default Menu;

export { MenuItem };
