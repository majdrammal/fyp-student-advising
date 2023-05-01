import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import ChatsPage from './ChatsPage';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Axios from 'axios';
import { careers } from '../Careers';
import { Link } from 'react-router-dom';

const HomePage = ({ user, userInfo }) => {

    const [value, onChange] = useState(new Date());
    const [events, setEvents] = useState([])
    const [careerPathId, setCareerPathId] = useState(null)

    const today = new Date().toISOString().slice(0, 10)

    const courses = ["EECE 350", "EECE 334", "EECE 430", "EECE 502", "CMPS 244"]

    function convertDateFormat(date) {
        if (date) {
            // From YYYY-MM-DD to English
            let dateArr = date.split("-")
            let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
            return `${months[parseInt(dateArr[1])-1]} ${dateArr[2]}, ${dateArr[0]}`
        }
    }

    useEffect(() => {
        Axios.get(`http://localhost:3100/getCareerPath/${user.uid}`).then(response => {
            if (response.data.length !== 0) {
                setCareerPathId(parseInt(response.data[0].careerPath))
            }
        })
        let elems = document.getElementsByClassName("nav__section")
        Array.from(elems).forEach(elem => elem.style.color = "var(--opaqueWhite)")
        document.querySelector(".nav__section--Dashboard").style.color = "var(--light)"
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:3100/getEvents/${userInfo?.userId}`).then((response) => {
            setEvents(response.data.sort(
                (a, b) => {
                    if (a.date > b.date) {
                        return 1
                    }
                    else {
                        return -1
                    }
                }
            )) 
            console.log(response.data)
        })
    }, [user, userInfo])

    return (
        <div id="home">
            <Nav user={user} userInfo={userInfo} />
            <div className="home__container">
                <div className="home__left">
                    <div className="home__banner">
                        <div className="home__banner--text">
                            <h2 className="home__banner--title">Welcome back, <span className="blue">{userInfo?.firstName}</span></h2>
                            <p className="home__banner--para">Education is the passport to the future, for tomorrow belongs to those who prepare for it <span className="blue">today</span>.</p>
                        </div>
                        <img src="https://media.istockphoto.com/id/1314731317/vector/special-education-preschool-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=NvB9oEwDoF86kuY1Y6GvK_UEuNQiAViqGtEciAiSBKc=" alt="" className="home__banner--img" />
                    </div>
                    <div className="home__events">
                        <h2 className="home__events--title">Upcoming Events</h2>
                        {
                            events.length === 0 ? (
                                <div className="home__events--wrapper">
                                    <div className="home__event">
                                        <p className="home__event--text">No upcoming events.</p>
                                    </div>
                                </div>
                            ) : (
                            <div className="home__events--wrapper">
                            {
                                events.filter(e => e.start.slice(0,10) >= today).map((event, index) => {
                                    return (
                                        <div className="home__event">
                                            <p className="home__event--text">{event?.text}</p>
                                            <h4 className="home__event--date">{event?.start.slice(0,10) === today ? "Today" : convertDateFormat(event?.start.slice(0,10))} at {event?.start.slice(11,16)}</h4>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            )
                        }
                    </div>
                    <div className="home__career">
                        <h2 className="home__career--title">Your Career Path</h2>
                        {
                            !isNaN(careerPathId) ? (
                            <div className="home__career--wrapper">
                                <div className="home__career--card">
                                    <h3 className="home__career--card--title">{careers[careerPathId]?.title}</h3>
                                    <br/>
                                    <p className="home__career--card--major">Related to: {careers[careerPathId]?.majors.join(', ')}</p>
                                    <br/>
                                    <p className="home__career--card--description">{careers[careerPathId]?.description}</p>
                                    <br/>
                                    <p className="home__career--card--skills"><b>Skills:</b> {careers[careerPathId]?.skills.join(', ')}</p>
                                    <p className="home__career--card--salary"><b>Average Salary:</b> {careers[careerPathId]?.averageSalary}</p>
                                    <p className="home__career--card--job-outlook"><b>Job Outlook:</b> {careers[careerPathId]?.jobOutlook}</p>
                                </div>
                            </div>
                            ) : (
                                <div className="home__career--wrapper">
                                    <div className="home__career--card">
                                        <h3 className="home__career--card--title">No Career Path Selected</h3>
                                        <br/>
                                        <p className="home__career--card--description">Please select a career path in the Career Path section of the dashboard.</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="home__right">
                    <div className="home__account">
                        <Link to="/feedback">
                            <FontAwesomeIcon icon="fa-search" className="home__search--icon" />
                        </Link>
                        <FontAwesomeIcon icon="fa-bell" className="home__notifications--icon" />
                        <div className="home__account--info">
                            <h4 className="home__account--name">{userInfo?.firstName} {userInfo?.lastName}</h4>
                            <p className="home__account--email">{userInfo?.email}</p>
                        </div>
                        <img src={userInfo?.profilePic} alt="" className="home__account--img" />
                    </div>
                    <div className="home__calendar">
                        <Calendar onChange={onChange} value={value} />
                    </div>
                    <div className="home__notifications">
                        <h4 className="home__notifications--title">Notifications</h4>
                        <p className="home__notifications--empty">No new notifications.</p>
                    </div>
                    <div className="home__messages">
                        <h4 className="home__messages--title">Messages</h4>
                        <p className="home__messages--empty">No new messages.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
