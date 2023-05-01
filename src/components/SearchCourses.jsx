import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { data } from '.././Data.js'

const SearchCourses = ({ setModal }) => {

    const [filter, setFilter] = useState('')

    return (
        <div id="search__courses">
            <div className="search__courses--container">
                <h1 className="search__courses--title">Search Courses</h1>
                <input type="text" placeholder='Search EECE courses...' className="search__courses--input" onChange={event => setFilter(event.target.value)}/>
                {
                    data.filter(course => course.courseNumber == filter).slice(0, 1).map(course => {
                        return (
                            <div className="searched__course">
                                <h2 className="searched__course--title">{course.courseTitle}</h2>
                                <p className="searched__course--number">EECE {course.courseNumber}</p>
                                <p className="searched__course--instructor">Instructor: {course.faculty[0]?.displayName}</p>
                                <Link to={`/course/${course.courseNumber}`}><button className="btn--1" onClick={() => setModal(false)}>View Feedback</button></Link>
                            </div>
                        )
                    })
                }
                <FontAwesomeIcon icon="fa-x" onClick={() => setModal(false)}/>
            </div>
        </div>
    );
}

export default SearchCourses;
