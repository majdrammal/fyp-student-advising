import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import Axios from 'axios';

const SearchUsers = ({ userInfo, setModal }) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [searchResult, setSearchResult] = useState([])

    function getUserByName() {
        Axios.get(`http://localhost:3100/getUserByName/${firstName}/${lastName}`).then(response => {
            setSearchResult(response.data)
        }) 
    }

    function goToUser(user) {
        localStorage.setItem("searchedUser", user.userId)
        window.location.href = `/profile/${user.firstName + "-" + user.lastName}`
    }

    return (
        <div id="search__users">
            <div className="search__users--container">
                <h1 className="search__users--title">Search Users</h1>
                <div className="search__users--inputs">
                    <input type="text" className="search__users--input" placeholder="First Name" onChange={(event) => setFirstName(event.target.value)}/>
                    <input type="text" className="search__users--input" placeholder="Last Name" onChange={(event) => setLastName(event.target.value)}/>
                    <FontAwesomeIcon icon="fa-search" className="search__users--icon" onClick={getUserByName}/>
                </div>
                <div className="search__users--res">
                    {
                        searchResult.map(res => {
                            return (
                            <div className="searched__user" onClick={() => goToUser(res)}>
                                <img src={res.profilePic} alt="" className="searched__user--img"/>
                                <p className="searched__user--name">{res.firstName + " " + res.lastName}</p>
                            </div>
                            )
                        })
                    }
                </div>
                <FontAwesomeIcon icon="fa-x" onClick={() => setModal(false)}/>
            </div>
        </div>
    );
}

export default SearchUsers;
