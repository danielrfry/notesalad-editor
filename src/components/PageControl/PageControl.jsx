import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Button from '../Button/Button';
import './PageControl.css';

const PageControlButton = ({ right, visible, onClick }) => {
    const className = classNames(
        'page-control__button',
        `page-control__button-${right ? 'right' : 'left'}`,
        { 'page-control__button--hidden': !visible }
    );
    const icon = right ? faChevronRight : faChevronLeft;
    return (
        <CSSTransition
            timeout={500}
            in={visible}
            classNames="page-control__button"
        >
            <div className={className}>
                <Button onClick={onClick}>
                    <FontAwesomeIcon icon={icon} />
                </Button>
            </div>
        </CSSTransition>
    );
};

export default class PageControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = { transitionRight: undefined, pageNo: 0 };
    }

    render = () => {
        const { children } = this.props;
        const { transitionRight, pageNo } = this.state;
        return (
            <div className="page-control">
                <PageControlButton
                    visible={pageNo !== 0}
                    onClick={this._handlePreviousPageClick}
                />
                <div
                    className={`page-control__content ${this._getDirectionClass(
                        transitionRight
                    )}`}
                >
                    {children.map((child, index) => (
                        <CSSTransition
                            key={index}
                            in={index === pageNo}
                            timeout={500}
                            classNames="page-control__page"
                        >
                            <div
                                className={classNames('page-control__page', {
                                    'page-control__page--hidden':
                                        index !== pageNo,
                                })}
                            >
                                {child}
                            </div>
                        </CSSTransition>
                    ))}
                </div>
                <PageControlButton
                    right
                    visible={pageNo < children.length - 1}
                    onClick={this._handleNextPageClick}
                />
            </div>
        );
    };

    componentDidUpdate = (_, prevState) => {
        const oldPageNo = prevState.pageNo;
        const newPageNo = this.state.pageNo;
        if (oldPageNo !== newPageNo) {
            if (oldPageNo === undefined) {
                this.setState({ transitionRight: undefined });
            } else {
                this.setState({ transitionRight: oldPageNo > newPageNo });
            }
        }
    };

    _getDirectionClass = direction => {
        if (direction === undefined) {
            return '';
        } else if (direction) {
            return 'page-control--transition-right';
        } else {
            return 'page-control--transition-left';
        }
    };

    _handleNextPageClick = () => {
        const { pageNo } = this.state;
        const { children } = this.props;
        const newPageNo = Math.min(children.length - 1, pageNo + 1);
        this.setState({ pageNo: newPageNo });
    };

    _handlePreviousPageClick = () => {
        const { pageNo } = this.state;
        const newPageNo = Math.max(0, pageNo - 1);
        this.setState({ pageNo: newPageNo });
    };
}
