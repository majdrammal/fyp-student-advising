import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import LogInPage from './pages/LogInPage';
import HomePage from './pages/HomePage';
import { auth, db } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import Nav from './Nav';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OtherProfilePage from './pages/OtherProfilePage';
import MapPage from './pages/MapPage';
import ChatsPage from './pages/ChatsPage';

function App() {

  const [user, setUser] = useState()
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
        // setLoading(false)
        if (user) {
          setUser(user) 
          let currentState = await getUserById(user.uid)
          setUserInfo(currentState)
          // localStorage.setItem('mainUserInfo', [currentState.username, currentState.image])
          // setDoc(doc(db, 'users', user.uid), {
          //     ... currentState,
          //     email: user.email,
          //     lastOnline: new Date().toLocaleString().split(',')[0]
          //   })
        }
      })
}, [user]) 

async function getUserById(id) {
  const picRef = doc(db, "userCollection", id)
  const picSnap = await getDoc(picRef)
  return picSnap.data()
}

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {!user && <Route path="/login" element={<LogInPage />}/>}
          {!user && <Route path="/register" element={<RegisterPage />}/>}
          {user && <Route path="/" element={<HomePage user={user} userInfo={userInfo} />}/>}
          {user && <Route path="/profile" element={<ProfilePage user={user} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>}
          {user && <Route path="/profile/:name" element={<OtherProfilePage userInfo={userInfo} setUserInfo={setUserInfo}/>}/>}
          {user && <Route path="/map" element={<MapPage userInfo={userInfo}/>}/>}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
