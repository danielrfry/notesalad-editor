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
            <Button onClick={onClick}>
                <FontAwesomeIcon icon={icon} />
            </Button>
        </Transition>
    );
};

const PageControl = ({ children }) => {
    const [pageNo, setPageNo] = React.useState(0);

    const _handleNextPageClick = () => {
        const newPageNo = Math.min(children.length - 1, pageNo + 1);
        setPageNo(newPageNo);
    };

    const _handlePreviousPageClick = () => {
        const newPageNo = Math.max(0, pageNo - 1);
        setPageNo(newPageNo);
    };

    return (
        <div className="page-control">
            <PageControlButton
                visible={pageNo != 0}
                onClick={_handlePreviousPageClick}
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
                    >
                        {child}
                    </div>
                ))}
            </div>
            <PageControlButton
                right
                visible={pageNo < children.length - 1}
                onClick={_handleNextPageClick}
            />
        </div>
    );
};

export default PageControl;
