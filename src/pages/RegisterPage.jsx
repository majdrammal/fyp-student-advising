import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { auth, db } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


const RegisterPage = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [department, setDepartment] = useState("")
    const [password, setPassword] = useState("")
    const [isAdvisor, setIsAdvisor] = useState(false)
    
    function register(e) {
        e.preventDefault()
        if (firstName != "" && lastName != "" && email != "" && department != "") {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setDoc(doc(db, 'userCollection', userCredential.user.uid), {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    isAdvisor: document.getElementById("form__checkbox").checked,
                    major: department, // for now
                    profilePic: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
                }).then(() => {
                    // window.location.href = "/"
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <div id="login">
            <form className="login__container">
                <h2 className="login__title">Join Us!</h2>
                <div className="register__names">
                    <div className="form__group">
                        <FontAwesomeIcon icon="fa-1" className="form__icon" />
                        <input placeholder="First Name" type="text" className="form__input" onChange={(event) => setFirstName(event.target.value) }/>
                    </div>
                    <div className="form__group">
                        <FontAwesomeIcon icon="fa-2" className="form__icon"/>
                        <input placeholder="Last Name" type="text" className="form__input" onChange={(event) => setLastName(event.target.value) }/>
                    </div>
                </div>
                <div className="form__group">
                    <FontAwesomeIcon icon="fa-lock" className="form__icon" />
                    <input placeholder="example@mail.com" type="email" className="form__input" onChange={(event) => setEmail(event.target.value) }/>
                </div>
                <div className="form__group">
                    <FontAwesomeIcon icon="fa-building" className="form__icon" />
                    <input placeholder="Department" type="text" className="form__input" onChange={(event) => setDepartment(event.target.value) }/>
                </div>
                <div className="form__group">
                <FontAwesomeIcon icon="fa-key" className="form__icon"/>
                    <input placeholder="password" type="password" className="form__input" onChange={(event) => setPassword(event.target.value) }/>
                </div>
                <div className="form__checkbox">
                    <input type="checkbox" id="form__checkbox"/> Are you an Advisor?
                </div>
                <button className="btn--1" onClick={event => register(event)}>Submit</button>
            </form>
        </div>
    );
}

export default RegisterPage;
