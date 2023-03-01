import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const LoadingScreen = () => {
    return (
        <div id="loading">
            <FontAwesomeIcon icon="fa-spinner" className="loading__icon"/>
        </div>
    );
}

export default LoadingScreen;
