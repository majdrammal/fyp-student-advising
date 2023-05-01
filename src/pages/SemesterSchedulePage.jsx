import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import Nav from '../components/Nav';
import { data } from '../Data';
import CourseBlock from '../components/CourseBlock';

const SemesterSchedulePage = ({ userInfo }) => {

    const [courseNumber, setCourseNumber] = useState(null)
    const [courseInfo, setCourseInfo] = useState(false)
    const [profilePicSrc, setProfilePicSrc] = useState(null)

    const [mondayCourses, setMondayCourses] = useState([null, null, null, null, null, null, null, null])
    const [tuesdayCourses, setTuesdayCourses] = useState([null, null, null, null, null, null, null, null])
    const [wednesdayCourses, setWednesdayCourses] = useState([null, null, null, null, null, null, null, null])
    const [thursdayCourses, setThursdayCourses] = useState([null, null, null, null, null, null, null, null])
    const [fridayCourses, setFridayCourses] = useState([null, null, null, null, null, null, null, null])

    function searchByCourseNumber() {
        console.log(data.filter(course => course.courseNumber === courseNumber))
        setCourseInfo(data.filter(course => course.courseNumber === courseNumber))
        setProfilePicSrc(`https://spservices.aub.edu.lb/PublicWebService.svc/FMIS_GetProfilePicture?memberId=${data.filter(course => course.courseNumber === courseNumber)[0].faculty[0].emailAddress.split('@')[0]}`)
    }

    function addCourseToSchedule(courseToAdd) {
        const timeRow = courseToAdd.meetingsFaculty[0]?.meetingTime.beginTime.substring(0,2)
        // const timeRowElem = document.querySelector(timeRow)
        if (courseToAdd.meetingsFaculty[0]?.meetingTime.monday) {
            if (timeRow == "08") {
                checkIfInSchedule("monday", timeRow)
                console.log(mondayCourses)
                setMondayCourses([courseToAdd, mondayCourses[1], mondayCourses[2], mondayCourses[3], mondayCourses[4], mondayCourses[5], mondayCourses[6], mondayCourses[7]])
            }
            else if (timeRow == "09") {
                setMondayCourses([mondayCourses[0], courseToAdd, mondayCourses[2], mondayCourses[3], mondayCourses[4], mondayCourses[5], mondayCourses[6], mondayCourses[7]])
            }
        }
        if (courseToAdd.meetingsFaculty[0]?.meetingTime.wednesday) {
            if (timeRow == "08") {
                console.log(wednesdayCourses)
                setWednesdayCourses([courseToAdd, wednesdayCourses[1], wednesdayCourses[2], wednesdayCourses[3], wednesdayCourses[4], wednesdayCourses[5], wednesdayCourses[6], wednesdayCourses[7]])
            }
            else if (timeRow == "09") {
                setWednesdayCourses([wednesdayCourses[0], courseToAdd, wednesdayCourses[2], wednesdayCourses[3], wednesdayCourses[4], wednesdayCourses[5], wednesdayCourses[6], wednesdayCourses[7]])
            }
        }
        if (courseToAdd.meetingsFaculty[0]?.meetingTime.friday) {
            if (timeRow == "08") {
                setFridayCourses([courseToAdd, fridayCourses[1], fridayCourses[2], fridayCourses[3], fridayCourses[4], fridayCourses[5], fridayCourses[6], fridayCourses[7]])
            }
            else if (timeRow == "09") {
                setFridayCourses([fridayCourses[0], courseToAdd, fridayCourses[2], fridayCourses[3], fridayCourses[4], fridayCourses[5], fridayCourses[6], fridayCourses[7]])
            }
        }
    }

    function checkIfInSchedule(day, time) {
        
    }

    function removeCourseFromSchedule(courseToRemove) {
        setMondayCourses(mondayCourses.map(course=> course == courseToRemove ? null : course))
        setTuesdayCourses(tuesdayCourses.map(course=> course == courseToRemove ? null : course))
        setWednesdayCourses(wednesdayCourses.map(course=> course == courseToRemove ? null : course))
        setThursdayCourses(thursdayCourses.map(course=> course == courseToRemove ? null : course))
        setFridayCourses(fridayCourses.map(course=> course == courseToRemove ? null : course))
    }

    useEffect(() => {
        let elems = document.getElementsByClassName("nav__section")
        Array.from(elems).forEach(elem => elem.style.color = "var(--opaqueWhite)")
        document.querySelector(".nav__section--Schedule").style.color = "var(--light)"
    }, [])

    return (
        <div id="schedule">
            <Nav userInfo={userInfo}/>
            <div className="schedule__container">

                <h1 className="schedule__title">My Schedule</h1>
                <table className="schedule__table">
                    <tr className="schedule__days--row">
                        <th></th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                    </tr>
                    <tr className="08__row">
                        <th>8:00</th>
                        <td>
                        {
                            mondayCourses[0] &&
                            <CourseBlock courseNumber={mondayCourses[0].courseNumber} beginTime={mondayCourses[0].meetingsFaculty[0]?.meetingTime.beginTime} endTime={mondayCourses[0].meetingsFaculty[0]?.meetingTime.endTime} />
                        }
                        </td>
                        <td></td>
                        <td>
                        {
                            wednesdayCourses[0] &&
                            <CourseBlock courseNumber={wednesdayCourses[0].courseNumber} beginTime={wednesdayCourses[0].meetingsFaculty[0]?.meetingTime.beginTime} endTime={wednesdayCourses[0].meetingsFaculty[0]?.meetingTime.endTime} />
                        }
                        </td>
                        <td></td>
                        <td>
                        {
                            fridayCourses[0] &&
                            <CourseBlock courseNumber={fridayCourses[0].courseNumber} beginTime={fridayCourses[0].meetingsFaculty[0]?.meetingTime.beginTime} endTime={fridayCourses[0].meetingsFaculty[0]?.meetingTime.endTime} />
                        }
                        </td>
                    </tr>
                    <tr className="09__row">
                        <th>9:00</th>
                        <td>
                        {
                            mondayCourses[1] &&
                            <CourseBlock courseNumber={mondayCourses[1].courseNumber} beginTime={mondayCourses[1].meetingsFaculty[0]?.meetingTime.beginTime} endTime={mondayCourses[1].meetingsFaculty[0]?.meetingTime.endTime} />
                        }
                        </td>
                        <td></td>
                        <td>
                        {
                            wednesdayCourses[1] &&
                            <CourseBlock courseNumber={wednesdayCourses[1].courseNumber} beginTime={wednesdayCourses[1].meetingsFaculty[0]?.meetingTime.beginTime} endTime={wednesdayCourses[1].meetingsFaculty[0]?.meetingTime.endTime} />
                        }
                        </td>
                        <td></td>
                        <td>
                        {
                            fridayCourses[1] &&
                            <CourseBlock courseNumber={fridayCourses[1].courseNumber} beginTime={fridayCourses[1].meetingsFaculty[0]?.meetingTime.beginTime} endTime={fridayCourses[1].meetingsFaculty[0]?.meetingTime.endTime} />
                        }
                        </td>
                    </tr>
                    <tr className="10__row">
                        <th>10:00</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="11__row">
                        <th>11:00</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="12__row">
                        <th>12:00</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="13__row">
                        <th>13:00</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="14__row">
                        <th>14:00</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="15__row">
                        <th>15:00</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                <div className="schedule__courses--container">
                    <div className="schedule__courses--input">
                        <h1 className="schedule__courses--title">
                            Search EECE Courses
                        </h1>
                        <div className="schedule__courses--search--wrapper">
                            <input type="text" className="schedule__courses--search" onChange={event => setCourseNumber(event.target.value)}/>
                            <button className="schedule__courses--search--btn" onClick={searchByCourseNumber}>Search</button>
                        </div>
                    </div>
                    {
                        courseInfo &&
                        courseInfo.map(course => {
                            return (
                                <div className="schedule__courses--result">
                                        <div className="schedule__courses--course--info">
                                        <h1 className="schedule__courses--course--number">EECE {course.courseNumber}</h1>
                                        <p className="schedule__courses--course--enrollment" style={course?.enrollment - course?.maximumEnrollment > 0 ? {color: "red"} : {color: "black"}}>Seats: {course.enrollment}/{course.maximumEnrollment}</p>
                                        <h2 className="schedule__courses--course--title">{course.courseTitle}</h2>
                                        {/* <p className="schedule__courses--course--credits">{course.creditHoursLow}</p> */}
                                        <h3 className="schedule__courses--course--instructor--name">Instructor: {course?.faculty[0]?.displayName}</h3>
                                        <p className="schedule__courses--course--instructor--name">Starts: {course?.meetingsFaculty[0]?.meetingTime.beginTime.substring(0,2)}:{course?.meetingsFaculty[0]?.meetingTime.beginTime.substring(2,4)}</p>
                                        <p className="schedule__courses--course--instructor--name">Ends: {course?.meetingsFaculty[0]?.meetingTime.endTime.substring(0,2)}:{course?.meetingsFaculty[0]?.meetingTime.endTime.substring(2,4)}</p>
                                        <p>Days:&nbsp;
                                            {course?.meetingsFaculty[0]?.meetingTime.monday && "M"}
                                            {course?.meetingsFaculty[0]?.meetingTime.tuesday && "T"}
                                            {course?.meetingsFaculty[0]?.meetingTime.wednesday && "W"}
                                            {course?.meetingsFaculty[0]?.meetingTime.thursday && "R"}
                                            {course?.meetingsFaculty[0]?.meetingTime.friday && "F"}
                                        </p>
                                        {
                                            (mondayCourses.includes(course) || tuesdayCourses.includes(course) || wednesdayCourses.includes(course) || thursdayCourses.includes(course) || fridayCourses.includes(course)) ? (
                                                <button className="btn--1 schedule__remove--btn" onClick={() => removeCourseFromSchedule(course)}>Remove</button>
                                            ) : (
                                                <button className="btn--1" onClick={() => addCourseToSchedule(course)}>Add</button>
                                            )
                                        }
                                    </div>
                                    <div className="schedule__courses--course--instructor">
                                        <img className="schedule__courses--course--instructor--img" src={`https://spservices.aub.edu.lb/PublicWebService.svc/FMIS_GetProfilePicture?memberId=${course.faculty[0].emailAddress.split('@')[0]}`} alt="" />
                                    </div>
                                </div>        
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default SemesterSchedulePage;
