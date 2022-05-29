import React, { useState } from 'react';
import { ToolbarItem } from '../Toolbar/Toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { usePopper } from 'react-popper';
import { Popover, Transition } from '@headlessui/react';

import './MenuButton.css';

const MenuButton = ({ children }) => {
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom-start',
    });

    return (
        <Popover className="menu-button">
            {({ open }) => (
                <>
                    <Popover.Button
                        as={ToolbarItem}
                        ref={setReferenceElement}
                        selected={open}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </Popover.Button>

                    <div
                        ref={setPopperElement}
                        style={styles.popper}
                        {...attributes.popper}
                        className="menu-button__popover"
                    >
                        <Transition
                            enter="menu-button__popover--transition"
                            enterFrom="menu-button__popover--closed"
                            enterTo="menu-button__popover--open"
                            leave="menu-button__popover--transition"
                            leaveFrom="menu-button__popover--open"
                            leaveTo="menu-button__popover--closed"
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
