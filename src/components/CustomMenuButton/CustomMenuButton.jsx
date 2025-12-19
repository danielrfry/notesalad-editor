import { ToolbarItem } from '../Toolbar/Toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

import './CustomMenuButton.css';

const MenuButton = ({ children }) => {
    return (
        <Popover className="custom-menu-button">
            <PopoverButton as={ToolbarItem}>
                <FontAwesomeIcon icon={faBars} />
            </PopoverButton>
            <PopoverPanel
                transition
                anchor="bottom"
                className="custom-menu-button__popover"
            >
                <div className="custom-menu-button__popover-content">
                    {children}
                </div>
            </PopoverPanel>
        </Popover>
    );
};

export default MenuButton;
