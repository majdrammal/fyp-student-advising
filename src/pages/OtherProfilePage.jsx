import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import Nav from '../Nav';

const OtherProfilePage = ({ userInfo }) => {

    const {name} = useParams()

    const [searchUserInfo, setSearchedUserInfo] = useState(false)

    async function getUserByUsername(email) {
        const userRef = query(
            collection(db, "userCollection"),
            where("email", "==", email),
            where("firstName", "==", name.split("-")[0])
        )
        const { docs } = await getDocs(userRef)
        setSearchedUserInfo(docs.map(doc => doc.data())[0])
    }

    useEffect(() => {
        getUserByUsername(localStorage.getItem("searchedEmail"))
    }, [])

    console.log(searchUserInfo)

    return (
        <div id="profile">
            <Nav userInfo={userInfo} />
            {
                searchUserInfo &&
                <div className="profile__container">
                    <div className="profile__upper">
                        <div className="profile__img--wrapper">
                            <img src={searchUserInfo?.profilePic} alt="" className="profile__img" />
                        </div>
                        <div className="profile__upper--text">
                            <h2 className="profile__name">{searchUserInfo?.firstName + " " + searchUserInfo?.lastName}</h2>
                            <p className="profile__major">{searchUserInfo?.major}</p>
                        </div>
                    </div>
                    {/* <div className="profile__buttons">
                        <button className="btn--1 profile__edit--btn">Edit Profile</button>
                        <label class="custom-file-upload btn btn--1">
                            <input type="file" onChange={event => saveImage(event.target.files[0])}/>
                            Edit Image
                        </label>
                    </div> */}
                </div>
            }
        </div>
    );
}

export default OtherProfilePage;
