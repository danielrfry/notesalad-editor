import Button from '../Button/Button';

import './Toolbar.css';

const Toolbar = (props) => {
    return <div className="toolbar">{props.children}</div>;
};

export const ToolbarItem = ({ highlighted, onClick, children, ref }) => (
    <Button
        ref={ref}
        highlighted={highlighted}
        extraClasses="toolbar__item"
        secondary
        hover
        onClick={onClick}
    >
        {children}
    </Button>
);

export default Toolbar;
