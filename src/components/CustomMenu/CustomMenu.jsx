import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from '@headlessui/react';

import './CustomMenu.css';

const CustomMenu = ({ ref, children }) => (
    <div ref={ref} className="custom-menu">
        {children}
    </div>
);

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
