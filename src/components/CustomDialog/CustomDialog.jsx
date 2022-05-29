import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

import './CustomDialog.css';
import Button from '../Button/Button';

const CustomDialog = ({ title, children, open, onClose }) => (
    <Transition show={open}>
        <Dialog onClose={onClose} className="custom-dialog">
            <Transition.Child
                className="custom-dialog__overlay"
                enter="custom-dialog__overlay--transition"
                enterFrom="custom-dialog__overlay--out"
                leave="custom-dialog__overlay--transition"
                leaveTo="custom-dialog__overlay--out"
            />

            <div className="custom-dialog__container">
                <Transition.Child
                    as={Dialog.Panel}
                    className="custom-dialog__content"
                    enter="custom-dialog__content--transition"
                    enterFrom="custom-dialog__content--out"
                    leave="custom-dialog__content--transition"
                    leaveTo="custom-dialog__content--out"
                >
                    <div className="custom-dialog__title">{title}</div>
                    {children}
                </Transition.Child>
            </div>
        </Dialog>
    </Transition>
);

CustomDialog.ButtonGroup = ({ children }) => (
    <div className="custom-dialog__button-group">{children}</div>
);

CustomDialog.Button = ({ isDefault, children, ...otherProps }) => (
    <Button
        {...otherProps}
        highlighted={isDefault}
        secondary
        small
        hover
        extraClasses="custom-dialog__button"
    >
        {children}
    </Button>
);

export default CustomDialog;
