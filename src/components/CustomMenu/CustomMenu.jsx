import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PopoverButton } from '@headlessui/react';

import './CustomMenu.css';

const CustomMenu = ({ ref, children }) => (
    <div ref={ref} className="custom-menu">
        {children}
    </div>
);

const CustomMenuItem = ({ children, icon, onClick }) => (
    <PopoverButton as="button" className="custom-menu-item" onClick={onClick}>
        {icon && (
            <div className="custom-menu-item__icon">
                <FontAwesomeIcon icon={icon} />
            </div>
        )}
        <div className="custom-menu-item__content">{children}</div>
    </PopoverButton>
);

export default CustomMenu;

export { CustomMenuItem };
