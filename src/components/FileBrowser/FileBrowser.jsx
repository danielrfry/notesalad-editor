import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import './FileBrowser.css';

const FileBrowser = forwardRef(({ accept, onFileSelected }, ref) => {
    const formRef = useRef();
    const inputRef = useRef();
    let clearing = false;

    useImperativeHandle(ref, () => ({
        open: () => {
            if (inputRef.current && formRef.current) {
                formRef.current.reset();
                inputRef.current.click();
            }
        },
    }));

    return (
        <form className="file-browser__form" ref={formRef}>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={e => {
                    if (!clearing) {
                        onFileSelected(e);
                    }
                }}
            />
        </form>
    );
});

export default FileBrowser;
