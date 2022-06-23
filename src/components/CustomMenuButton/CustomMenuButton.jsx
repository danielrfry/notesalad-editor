import React, { useState } from 'react';
import { ToolbarItem } from '../Toolbar/Toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { usePopper } from 'react-popper';
import { Popover, Transition } from '@headlessui/react';

import './CustomMenuButton.css';

const MenuButton = ({ children }) => {
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom-start',
    });

    return (
        <Popover className="custom-menu-button">
            {({ open }) => (
                <>
                    <Popover.Button
                        as={ToolbarItem}
                        ref={setReferenceElement}
                        highlighted={open}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </Popover.Button>

                    <div
                        ref={setPopperElement}
                        style={styles.popper}
                        {...attributes.popper}
                        className="custom-menu-button__popover"
                    >
                        <Transition
                            enter="custom-menu-button__popover--transition"
                            enterFrom="custom-menu-button__popover--closed"
                            enterTo="custom-menu-button__popover--open"
                            leave="custom-menu-button__popover--transition"
                            leaveFrom="custom-menu-button__popover--open"
                            leaveTo="custom-menu-button__popover--closed"
                        >
                            <Popover.Panel>{children}</Popover.Panel>
                        </Transition>
                    </div>
                </>
            )}
        </Popover>
    );
};

export default MenuButton;
