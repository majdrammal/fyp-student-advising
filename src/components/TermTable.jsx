import React, { useState, useEffect } from 'react';
import { data } from '../Data.js'

const TermTable = ({ term, season, courses }) => {

    const [addModal, setAddModal] = useState(false)
    const [coursesState, setCoursesState] = useState([])
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [addedCourse, setAddedCourse] = useState({})
    const [addedCourses, setAddedCourses] = useState([])
    const [filter, setFilter] = useState("")

    function openAddModal(event, index) {
        event.preventDefault();
        setAddModal(index)
    }

    function addCourse(chosenNum, chosenDesc, chosenCredits) {
        let adjCourses = coursesState;
        adjCourses.splice(addModal, 1);
        adjCourses.push({
            number: `EECE ${chosenNum}`,
            desc: chosenDesc,
            credits: chosenCredits
        })
        setCoursesState(adjCourses)
        setAddedCourses([...addedCourses, chosenNum])
        setAddModal(false)
    }

    function removeCourse(event, course, index) {
        event.preventDefault();
        if (course.credits === 0) {
            alert("Please select a course first.")
        }
        else {
            coursesState.splice(index, 1)
            setCoursesState([...coursesState, {
                number: "Choice-300-400",
                desc: "",
                credits: 0
            }])
        }
    }

    useEffect(() => {
        setCoursesState(courses)
    }, [])

    return (
        <table>
            <tr>
                <th>Term {term} ({season})</th>
            </tr>
            <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Credits</th>
            </tr>
            {
                coursesState.map((course, index) => {
                    if (course.number.split("-")[0] == "Choice") {
                        return (
                            <tr>
                                <td style={{color: "gray"}}>EECE 3xx/4xx</td>
                                <td><button onClick={event => openAddModal(event, index)}>Add</button></td>
                                <td><button className="planning__remove--btn">Remove</button></td>
                            </tr>
                        )
                    }
                    else {
                        if (addedCourses.includes(course.number.split(" ")[1])) {
                            return (
                                <tr className={`added__course course-${index}`}  onClick={(event) => {removeCourse(event, course, index)}}>
                                    <td>{course.number}</td>
                                    <td>{course.desc}</td>
                                    <td>{course.credits}</td>
                                </tr>
                            )
                        }
                        else {
                            return (
                                <tr className={`course-${index}`}>
                                    <td>{course.number}</td>
                                    <td>{course.desc}</td>
                                    <td>{course.credits}</td>
                                </tr>
                            )
                        }
                    }
                })
            }
            {
                !!addModal && 
                <div className="add__modal">
                    <div className="add__modal--container">
                        <h2>Add Course</h2>
                        <input type="number" placeholder="EECE XXXX" onChange={event => setFilter(event.target.value)}/>
                        {
                            data.filter(course => course.courseNumber.includes(filter)).slice(0, 10).map(course => {
                                if (course.meetingsFaculty[0].meetingTime.creditHourSession !== 0) {
                                    return (
                                        <div className="searched__course" onClick={() => addCourse(course.courseNumber, course.courseTitle, course.meetingsFaculty[0].meetingTime.creditHourSession)}>
                                            <p>EECE {course.courseNumber}</p>
                                            <i>{course.courseTitle}</i>
                                            <i style={{color: "gray"}}>{course.meetingsFaculty[0].meetingTime.creditHourSession} credits</i>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            }
        </table>
    );
}

export default TermTable;
