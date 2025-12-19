import classNames from 'classnames';

import './TitledGroup.css';

const TitledGroup = ({
    withMargin = true,
    fillV,
    extraClasses,
    extraStyles,
    title,
    children,
}) => {
    return (
        <div
            className={classNames(
                'titled-group',
                {
                    'titled-group--with-margin': withMargin,
                    'titled-group--fill-v': fillV,
                },
                extraClasses
            )}
            style={extraStyles}
        >
            <div className="titled-group__title">{title}</div>
            <div className="titled-group__contents">{children}</div>
        </div>
    );
};

export default TitledGroup;
