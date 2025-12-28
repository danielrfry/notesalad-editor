import React from 'react';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Button from '../Button/Button';
import './PageControl.css';
import { Transition } from '@headlessui/react';

const PageControlButton = ({ right, visible, onClick }) => {
    const className = classNames(
        'page-control__button-box',
        `page-control__button-box--${right ? 'right' : 'left'}`
    );
    const icon = right ? faChevronRight : faChevronLeft;
    return (
        <Transition show={visible} as="div" className={className}>
            <Button onClick={onClick} tabIndex="-1">
                <FontAwesomeIcon icon={icon} />
            </Button>
        </Transition>
    );
};

const PageControl = ({ children }) => {
    const [pageNo, setPageNo] = React.useState(0);

    const handleNextPageClick = () => {
        const newPageNo = Math.min(children.length - 1, pageNo + 1);
        setPageNo(newPageNo);
    };

    const handlePreviousPageClick = () => {
        const newPageNo = Math.max(0, pageNo - 1);
        setPageNo(newPageNo);
    };

    const handlePageFocused = (pageIndex) => {
        setPageNo(pageIndex);
    };

    return (
        <div className="page-control">
            <PageControlButton
                visible={pageNo != 0}
                onClick={handlePreviousPageClick}
            />
            <div
                className="page-control__content"
                style={{ transform: `translateX(-${pageNo * 100}%)` }}
            >
                {children.map((child, index) => (
                    <div
                        key={index}
                        className={classNames('page-control__page', {
                            'page-control__page--hidden': index !== pageNo,
                        })}
                        style={{ transform: `translateX(${index * 100}%)` }}
                        onFocus={() => handlePageFocused(index)}
                    >
                        {child}
                    </div>
                ))}
            </div>
            <PageControlButton
                right
                visible={pageNo < children.length - 1}
                onClick={handleNextPageClick}
            />
        </div>
    );
};

export default PageControl;
