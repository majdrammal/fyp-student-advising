import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase-config';
import ChatsPage from '../pages/ChatsPage';
import { Link } from 'react-router-dom';
import SearchCourses from './SearchCourses';
import NavSection from './ui/NavSection';

const Nav = ({ user, userInfo}) => {

    const [navModal, setNavModal] = useState(false)
    const [searchOn, setSearchOn] = useState(false)
    const [chatsOn, setChatsOn] = useState(false)
    const [searchCoursesOn, setSearchCoursesOn] = useState(false)

    function toggleNavModal() {
        if (navModal) {
            document.querySelector(".nav__modal").style.opacity = "0"
            document.querySelector(".nav__modal").style.height = "0"
        }
        else {
            document.querySelector(".nav__modal").style.opacity = "1"
            document.querySelector(".nav__modal").style.height = "100px"
        }
        setNavModal(!navModal)
    }

    function logout() {
        signOut(auth)
        window.location.href = "/login"
    }

    function showSearch() {
        setSearchCoursesOn(!searchCoursesOn)
    }

    return (
        <nav>
            <div className="nav__container">
                <Link to="/">
                    <h3 className="logo"><FontAwesomeIcon icon="fa-book" /> Vizer</h3>
                </Link>
                <h3 className="nav__sections">
                    <NavSection link="/" icon="house" title="Dashboard" />
                    <NavSection link="/calendar" icon="calendar" title="Calendar" />
                    <NavSection link="/schedule" icon="clock" title="Schedule" />
                    <NavSection link="/feedback" icon="thumbs-up" title="Feedback"/>
                    <NavSection link="/planning" icon="bookmark" title="Planning" />
                    <NavSection link="/careers" icon="briefcase" title="Careers" />
                    <div className={`nav__section`} onClick={showSearch}>
                        <FontAwesomeIcon icon={`fa-magnifying-glass`} className="nav__section--icon" />
                        <p className="nav__section--title">Search</p>
                    </div>
                </h3>
            </div>
            <button className="btn--2" onClick={logout}>Log Out</button>
            {
                searchCoursesOn && <SearchCourses setModal={setSearchCoursesOn} />
            }
        </nav>
    );
}

export default Nav;

/* 

<div className="nav__container">
                <a href="/">
                    <h3 className="logo"><FontAwesomeIcon icon="fa-book" /> Vizer</h3>
                </a>
                <div className="nav__icons">
                    <div className="nav__search--wrapper">
                        <input type="text" className="nav__search" />
                        <FontAwesomeIcon icon="fa-magnifying-glass" className="nav__icon nav__icon--search" onClick={showSearch}/>
                    </div>
                    <Link to="/calendar"><FontAwesomeIcon icon="fa-calendar" className="nav__icon" /></Link>
                    <Link to="/schedule"><FontAwesomeIcon icon="fa-clock" className="nav__icon" /></Link>
                    <FontAwesomeIcon icon="fa-comment" className="nav__icon" onClick={() => setChatsOn(true)} />
                    {/* <FontAwesomeIcon icon="fa-thumbs-up" className="nav__icon" /> */
            //         <Link to="/planning"><FontAwesomeIcon icon="fa-bookmark" className="nav__icon" /></Link>
            //         <Link to="/careers"><FontAwesomeIcon icon="fa-briefcase" className="nav__icon" /></Link>
            //         <FontAwesomeIcon icon="fa-door-open" className="nav__icon" />
            //         <div className="nav__end" onClick={toggleNavModal}>
            //             <div className="nav__img--wrapper">
            //                 <img src={userInfo?.profilePic} className="nav__img" alt="" />
            //                 <FontAwesomeIcon icon="fa-caret-down" />
            //             </div>
            //             <ul className="nav__modal">
            //                 <li><a href="/profile">Profile</a></li>
            //                 <li><a href="">Settings</a></li>
            //                 <li onClick={logout}>Logout</li>
            //             </ul>
            //         </div>
            //     </div>
            // </div>
            // {chatsOn && <ChatsPage user={user} userInfo={userInfo} setOn={setChatsOn}/>}
            // {
            //     searchCoursesOn && <SearchCourses setModal={setSearchCoursesOn} />
            // }
