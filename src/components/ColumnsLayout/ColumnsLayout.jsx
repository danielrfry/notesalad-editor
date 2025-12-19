import classNames from 'classnames';

import './ColumnsLayout.css';

const ColumnsLayout = (props) => (
    <div
        className={classNames(
            'columns-layout',
            {
                'columns-layout--stretch-h': props.stretchH,
                'columns-layout--stretch-v': props.stretchV,
            },
            props.extraClasses
        )}
    >
        {props.children}
    </div>
);

export default ColumnsLayout;
