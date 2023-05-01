import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { db, storage } from '../firebase-config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from 'firebase/firestore';
import LoadingScreen from '../components/LoadingScreen';
import SearchUsers from '../components/SearchUsers';
import Axios from 'axios';

const ProfilePage = ({ user, userInfo, setUserInfo }) => {

    const [loading, setLoading] = useState(false)
    const [searchModal, setSearchModal] = useState(false)
    const [events, setEvents] = useState([])

    const today = new Date().toISOString().slice(0, 10)

    function saveImage(image) {
        if (!image) {
            alert("Please upload an image.")
        }
        else {
            const storageRef = ref(storage, `/profilePics/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    setLoading(
                        // Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        true
                    )
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        Axios.post("http://localhost:3100/updateProfilePic", {
                            userId: user.uid,
                            profilePic: url
                        }).then(() => {
                            setLoading(false)
                            setUserInfo({...userInfo, profilePic: url})
                        })
                    });
                }
            );

        };
    }

    useEffect(() => {
        Axios.get(`http://localhost:3100/getEvents/${userInfo?.userId}`).then((response) => {
            setEvents(response.data) 
        })
    }, [user, userInfo])

    return (
        <div id="profile">
            <Nav userInfo={userInfo} />
            {
                userInfo &&
                <div className="profile__container">
                    <div className="profile__upper">
                        <div className="profile__img--wrapper">
                            <img src={userInfo?.profilePic} alt="" className="profile__img" />
                        </div>
                        <div className="profile__upper--text">
                            <h2 className="profile__name">{userInfo?.firstName + " " + userInfo?.lastName} <span>({userInfo?.username})</span></h2>
                            <p className="profile__major">{userInfo?.major}</p>
                        </div>
                    </div>
                    <div className="profile__events">
                        <h2 className="profile__events--title">Upcoming Events</h2>
                        <div className="profile__events--wrapper">
                            {
                                events.filter(e => e.start.slice(0,10) >= today).map((event, index) => {
                                    return (
                                        <div className="profile__event">
                                            <h4>{event.start.slice(0,10) === today ? "Today" : event.start.slice(0,10)} at {event.start.slice(11,16)}</h4>
                                            <p>{event.text}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="profile__buttons">
                        <button className="btn--1 profile__edit--btn">Edit Profile</button>
                        <button className="btn--1 profile__search--btn" onClick={() => setSearchModal(true)}>Search Users</button>
                        <label class="custom-file-upload btn btn--1">
                            <input type="file" onChange={event => saveImage(event.target.files[0])}/>
                            Edit Image
                        </label>
                    </div>
                </div>
            }
            {loading && <LoadingScreen />}
            {searchModal && <SearchUsers setModal={setSearchModal}/>}
        </div>
    );
}

export default ProfilePage;
