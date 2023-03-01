import React, { useState } from 'react';
import Nav from '../Nav';
import ChatsPage from './ChatsPage';

const HomePage = ({ user, userInfo }) => {

    return (
        <div id="home">
            <Nav user={user} userInfo={userInfo} />
            <div className="home__container">
                {
                    userInfo &&
                    <h1 className="home__welcome">Hello {userInfo?.firstName} {userInfo?.lastName}!</h1>
                }
            </div>
        </div>
    );
}

export default HomePage;
