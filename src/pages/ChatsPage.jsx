import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import Messages from '../components/Messages';
import { db } from '../firebase-config';
import Nav from '../Nav';

const ChatsPage = ({ user, userInfo, setOn }) => {

    const [chats, setChats] = useState([])

    async function getChatByUserId() {
        const userRef = query(
            collection(db, "chats"),
            where("firstUserId", "==", user.uid || "secondUserId", "==", user.uid),
        )
        const { docs } = await getDocs(userRef)
        setChats(docs.map(doc => doc.data()))
        // console.log(docs.map(doc => doc.data()))
    }

    return (
        <div id="chats">
            <div className="chats__container">
                <h1 className="chats__title">My Chats</h1>
                <input type="text" placeholder='Star a new chat...' className="chats__search" />
                <div className="chats__wrapper">
                    <div className="chat">
                        <img src={userInfo?.profilePic} alt="" />
                        <h4>{userInfo?.firstName} {userInfo?.lastName}</h4>
                    </div>
                </div>
                <FontAwesomeIcon icon="fa-x" className="chats__closer" onClick={() => setOn(false)} />
            </div>
            <Messages userInfo={userInfo}/>
        </div>
    );
}

export default ChatsPage;
