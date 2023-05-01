import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const NavSection = ({ link, icon, title }) => {
    return (
        <Link className={`nav__section nav__section--${title}`} to={link}>
            <FontAwesomeIcon icon={`fa-${icon}`} className="nav__section--icon" />
            <p className="nav__section--title">{title}</p>
        </Link>
    );
}

export default NavSection;
