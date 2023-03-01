import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LogInPage = () => {

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    function login(e) {
        e.preventDefault()
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then(() => {
            window.location.href = "/"
        })
        .catch(() => {
            alert("Error while logging in...")
        })
    }

    return (
        <div id="login">
            <form className="login__container">
                <h2 className="login__title">Welcome Back!</h2>
                <div className="form__group">
                    <FontAwesomeIcon icon="fa-lock" className="form__icon"/>
                    <input placeholder="example@mail.com" type="email" className="form__input" onChange={(event) => setLoginEmail(event.target.value)}/>
                </div>
                <div className="form__group">
                <FontAwesomeIcon icon="fa-key" className="form__icon"/>
                    <input placeholder="password" type="password" className="form__input" onChange={(event) => setLoginPassword(event.target.value)}/>
                </div>
                <p className="login__forgot">Forgot Password?</p>
                <button className="btn--1" onClick={event => login(event)}>Submit</button>
            </form>
        </div>
    );
}

export default LogInPage;
