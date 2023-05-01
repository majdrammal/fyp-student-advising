import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import LogInPage from './pages/LogInPage';
import HomePage from './pages/HomePage';
import { auth, db } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import Nav from './components/Nav';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OtherProfilePage from './pages/OtherProfilePage';
import MapPage from './pages/MapPage';
import ChatsPage from './pages/ChatsPage';
import SemesterSchedulePage from './pages/SemesterSchedulePage';
import CoursePlanningPage from './pages/CoursePlanningPage';
import Axios from 'axios';
import CoursePage from './pages/CoursePage';
import CalendarPage from './pages/CalendarPage';
import CareersPage from './pages/CareersPage';
import FeedbackSearchPage from './pages/FeedbackSearchPage';

function App() {

  const [user, setUser] = useState()
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user) 
          Axios.get(`http://localhost:3100/getUser/${user.uid}`).then(response => {
            setUserInfo(response.data[0])
          })
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
          {user && <Route path="/schedule" element={<SemesterSchedulePage userInfo={userInfo}/>}/>}
          {user && <Route path="/planning" element={<CoursePlanningPage userInfo={userInfo}/>}/>}
          {user && <Route path="/course/:courseNum" element={<CoursePage user={user} userInfo={userInfo}/>}/>}
          {user && <Route path="/calendar" element={<CalendarPage user={user} userInfo={userInfo}/>}/>}
          {user && <Route path="/careers" element={<CareersPage user={user} userInfo={userInfo}/>}/>}
          {user && <Route path="/feedback" element={<FeedbackSearchPage user={user} userInfo={userInfo}/>}/>}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
