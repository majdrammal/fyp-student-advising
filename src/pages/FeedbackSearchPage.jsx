import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import { data } from '../Data';

const FeedbackSearchPage = ({ user, userInfo }) => {

    const [courseFilter, setCourseFilter] = useState('')

    useEffect(() => {
        let elems = document.getElementsByClassName("nav__section")
        Array.from(elems).forEach(elem => elem.style.color = "var(--opaqueWhite)")
        document.querySelector(".nav__section--Feedback").style.color = "var(--light)"
    }, [])

    return (
        <div id="careers__page">
            <Nav user={user} userInfo={userInfo} />
            <div className="careers__page--container">
                <h1 className="careers__page--title feedback__search--title">Search Courses</h1>
                <input type="text" placeholder="Search by course number..." className="careers__search" onChange={
                    (e) => {
                        setCourseFilter(e.target.value)
                    }
                } />
                <div className="careers__page--wrapper">
                    {
                        data.filter(course => course.courseNumber == courseFilter).slice(0, 1).map(course => {
                            return (
                                <div className="searched__course">
                                    <h2 className="searched__course--title">{course.courseTitle}</h2>
                                    <p className="searched__course--number">EECE {course.courseNumber}</p>
                                    <p className="searched__course--instructor">Instructor: {course.faculty[0]?.displayName}</p>
                                    <Link to={`/course/${course.courseNumber}`}><button className="btn--1">View Feedback</button></Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default FeedbackSearchPage;
