import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faKey, faStar, faCalendar, faComment, faThumbsUp, faBookmark, faBriefcase, faDoorOpen, faCaretDown, faBook, fa1, fa2, faBuilding, faPenToSquare, faMagnifyingGlass, faSpinner, faX, faClock, faHouse, faBell } from '@fortawesome/free-solid-svg-icons';
library.add(faLock, faKey, faStar, faCalendar, faComment, faThumbsUp, faBookmark, faBriefcase, faDoorOpen, faCaretDown, faBook, fa1, fa2, faBuilding, faPenToSquare, faMagnifyingGlass, faSpinner, faX, faClock, faHouse, faBell)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

