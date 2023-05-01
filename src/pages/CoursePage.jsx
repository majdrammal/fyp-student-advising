import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Axios from 'axios';
import AddFeedback from '../components/AddFeedback';
import Rating from '../components/ui/Rating';

const CoursePage = ({ user, userInfo }) => {

    const { courseNum } = useParams();

    function getFeedback() {
        Axios.get(`http://localhost:3100/getFeedback/${courseNum}`).then(response => {
            setFeedback(response.data)
        })
    }

    const [feedback, setFeedback] = useState([])
    const [addFeedback, setAddFeedback] = useState(false)

    function convertDateFormat(date) {
        if (date) {
            // From YYYY-MM-DD to English
            let dateArr = date.split("-")
            let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
            return `${months[parseInt(dateArr[1])-1]} ${dateArr[2]}, ${dateArr[0]}`
        }
    }

    useEffect(() => {
        getFeedback()
        convertDateFormat()
    }, [courseNum])

    return (
        <div id="feedback__page">
            <Nav user={user} userInfo={userInfo} />
            <div className="feedback__page--container">
                <div className="feedback__page--title--wrapper">
                    <h1 className="feedback__page--title">Course Feedback: EECE {courseNum}</h1>
                    <button className="btn--1" onClick={() => setAddFeedback(!addFeedback)}>Leave Feedback</button>
                </div>
                <div className="feedback">
                    <div className="feedback__header">
                        <h2 className="feedback__header--title">Feedback ({feedback.length})</h2>
                        {
                            feedback.map(feedback => {
                                return (
                                    <div className="feedback__card">
                                        <p className='feedback__comment'>{feedback.comment}</p>
                                        <p className='feedback__workload'>Workload: <Rating rating={feedback.workload}/></p>
                                        <p className='feedback__attendance'>Difficulty: <Rating rating={feedback.attendance}/></p>
                                        <p className='feedback__material'>Material: <Rating rating={feedback.material}/></p>
                                        <p className='feedback__author'>Submitted by {feedback.username} on {convertDateFormat(feedback.date.slice(0,10))}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {
                addFeedback && <AddFeedback setModal={setAddFeedback} courseNum={courseNum} userInfo={userInfo} setFeedback={setFeedback} />
            }
        </div>
    );
}

export default CoursePage;
