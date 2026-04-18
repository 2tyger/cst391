import React from 'react';

const Card = (props) => {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick(props.albumId);
        }
    };

    return (
        <div className="card" style={{ width: '18rem' }}>
            <img src={props.imageURL} className="card-img-top" alt={props.albumTitle} />
            <div className="card-body">
                <h5 className="card-title">{props.albumTitle}</h5>
                <p className="card-text">{props.albumDescription}</p>
                <button type="button" className="btn btn-primary" onClick={handleClick}>
                    {props.buttonText}
                </button>
            </div>
        </div>
    );
};

export default Card;
