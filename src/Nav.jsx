import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase-config';
import ChatsPage from './pages/ChatsPage';

const Nav = ({ user, userInfo}) => {

    const [navModal, setNavModal] = useState(false)
    const [searchOn, setSearchOn] = useState(false)
    const [chatsOn, setChatsOn] = useState(false)

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
        if (searchOn) {
            document.querySelector(".nav__search").style.visibility = "hidden"
            document.querySelector(".nav__search").style.width = "0"
            document.querySelector(".nav__icon--search").style.opacity = "0.8"
        }
        else {
            document.querySelector(".nav__search").style.visibility = "visible"
            document.querySelector(".nav__search").style.width = "150px"
            document.querySelector(".nav__icon--search").style.opacity = "1"
        }
        setSearchOn(!searchOn)
    }

    return (
        <nav>
            <div className="nav__container">
                <a href="/">
                    <h3 className="logo"><FontAwesomeIcon icon="fa-book" /> Vizer</h3>
                </a>
                <div className="nav__icons">
                    <div className="nav__search--wrapper">
                        <input type="text" className="nav__search" />
                        <FontAwesomeIcon icon="fa-magnifying-glass" className="nav__icon nav__icon--search" onClick={showSearch}/>
                    </div>
                    <FontAwesomeIcon icon="fa-calendar" className="nav__icon" />
                    <FontAwesomeIcon icon="fa-comment" className="nav__icon" onClick={() => setChatsOn(true)} />
                    <FontAwesomeIcon icon="fa-thumbs-up" className="nav__icon" />
                    <FontAwesomeIcon icon="fa-bookmark" className="nav__icon" />
                    <FontAwesomeIcon icon="fa-briefcase" className="nav__icon" />
                    <FontAwesomeIcon icon="fa-door-open" className="nav__icon" />
                    <div className="nav__end" onClick={toggleNavModal}>
                        <div className="nav__img--wrapper">
                            <img src={userInfo?.profilePic} className="nav__img" alt="" />
                            <FontAwesomeIcon icon="fa-caret-down" />
                        </div>
                        <ul className="nav__modal">
                            <li><a href="/profile">Profile</a></li>
                            <li><a href="">Settings</a></li>
                            <li onClick={logout}>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
            {chatsOn && <ChatsPage user={user} userInfo={userInfo} setOn={setChatsOn}/>}
        </nav>
    );
}

export default Nav;
