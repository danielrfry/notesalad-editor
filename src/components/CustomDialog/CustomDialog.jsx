import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';

import './CustomDialog.css';
import Button from '../Button/Button';

const CustomDialog = ({ title, children, open, onClose, initialFocus }) => (
    <Dialog
        open={open}
        onClose={onClose}
        className="custom-dialog"
        initialFocus={initialFocus}
    >
        <DialogBackdrop transition className="custom-dialog__backdrop" />

        <div className="custom-dialog__container">
            <DialogPanel transition className="custom-dialog__content">
                <div className="custom-dialog__title">{title}</div>
                {children}
            </DialogPanel>
        </div>
    </Dialog>
);

CustomDialog.ButtonGroup = ({ children }) => (
    <div className="custom-dialog__button-group">{children}</div>
);

CustomDialog.Button = ({ isDefault, children, ref, ...otherProps }) => (
    <Button
        {...otherProps}
        highlighted={isDefault}
        secondary
        small
        hover
        extraClasses="custom-dialog__button"
        ref={ref}
    >
        {children}
    </Button>
);

export default CustomDialog;
