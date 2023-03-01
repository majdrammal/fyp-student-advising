import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Nav from '../Nav';
import { db, storage } from '../firebase-config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from 'firebase/firestore';
import LoadingScreen from '../components/LoadingScreen';
import SearchUsers from '../components/SearchUsers';

const ProfilePage = ({ user, userInfo, setUserInfo }) => {

    const [loading, setLoading] = useState(false)
    const [searchModal, setSearchModal] = useState(false)

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
                        updateDoc(doc(db,'userCollection', user.uid),{
                            profilePic: url,
                          }).then(response => {
                            setLoading(false)
                            setUserInfo({...userInfo, profilePic: url})
                          }).catch(error =>{
                            console.log(error.message)
                          })
                    });
                }
            );

        };
    }

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
                            <h2 className="profile__name">{userInfo?.firstName + " " + userInfo?.lastName}</h2>
                            <p className="profile__major">{userInfo?.major}</p>
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
