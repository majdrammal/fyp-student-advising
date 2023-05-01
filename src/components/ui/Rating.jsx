import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Rating = ({ rating }) => {
    return (
        <div className="rating">
            {
                new Array(Math.floor(rating)).fill(0).map((_, index) => <FontAwesomeIcon icon="fa-star" key={index} />)
            }   
            { 
                !Number.isInteger(rating) && <FontAwesomeIcon icon="fa-solid fa-star-half-stroke" /> 
            } 
        </div>
    );
}

export default Rating;
