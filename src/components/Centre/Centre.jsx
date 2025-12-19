import './Centre.css';

const Centre = (props) => {
    return (
        <div className="centre">
            <div>{props.children}</div>
        </div>
    );
};

export default Centre;
