import React from 'react';
import classNames from 'classnames';

import './TitledGroup.css';

const TitledGroup = props => {
    return (
        <div
            className={classNames(
                'titled-group',
                {
                    'titled-group--with-margin': props.withMargin,
                    'titled-group--fill-v': props.fillV,
                },
                props.extraClasses
            )}
            style={props.extraStyles}
        >
            <div className="titled-group__title">{props.title}</div>
            <div className="titled-group__contents">{props.children}</div>
        </div>
    );
};
TitledGroup.defaultProps = { withMargin: true };

export default TitledGroup;
