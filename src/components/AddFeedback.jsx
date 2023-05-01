import React, { useState } from 'react';
import Axios from 'axios';

const AddFeedback = ({ setModal, courseNum, userInfo, setFeedback }) => {

    const [workload, setWorkload] = useState(5)
    const [attendance, setAttendance] = useState(5)
    const [material, setMaterial] = useState(5)
    const [comment, setComment] = useState("")

    function submitFeedback(event) {
        event.preventDefault()
        let feedback = {
            workload: workload,
            attendance: attendance,
            material: material,
            date: new Date().toISOString().slice(0,10),
            courseNum: courseNum,
            username: userInfo.username,
            comment: comment
        }
        Axios.post("http://localhost:3100/addFeedback", feedback).then(() => {
            setFeedback(prev => [...prev, feedback])
            setModal(false)
        })
    }

    return (
        <div id="add__feedback">
            <div className="add__feedback__container">
                <h1 className="add__feedback__title">Add Feedback</h1>
                <div className="add__feedback__wrapper">
                    <form className="add__feedback__form">
                        <div className="feedback__form--group">
                            <label htmlFor="workload">Workload</label>
                            <input type="range" name="workload" id="workload" min="1" max="5" onChange={event => setWorkload(event.target.value)}/>
                        </div>
                        <div className="feedback__form--group">
                            <label htmlFor="attendance">Difficulty</label>
                            <input type="range" name="attendance" id="attendance" min="1" max="5" onChange={event => setAttendance(event.target.value)}/>
                        </div>
                        <div className="feedback__form--group">
                            <label htmlFor="material">Material</label>
                            <input type="range" name="material" id="material" min="1" max="5" onChange={event => setMaterial(event.target.value)}/>
                        </div>
                        <div className="feedback__form--group">
                            <label htmlFor="comment">Comment</label>
                            <textarea name="comment" id="comment" cols="30" rows="10" onChange={event => setComment(event.target.value)}></textarea>
                        </div>
                        <button className="btn--1" onClick={event => submitFeedback(event)}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddFeedback;
