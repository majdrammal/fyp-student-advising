import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { careers } from '../Careers.js'; 
import Axios from 'axios';

const CareersPage = ({ user, userInfo }) => {

    const [careersFilter, setCareersFilter] = useState("")
    const [careerPathId, setCareerPathId] = useState(null)

    function setCareerPath(id) {
        Axios.post(`http://localhost:3100/updateCareerPath`, {
            userId: user.uid,
            careerPath: id
        }).then(() => {
            setCareerPathId(id)
        })
    }

    useEffect(() => {
        Axios.get(`http://localhost:3100/getCareerPath/${user.uid}`).then(response => {
            setCareerPathId(parseInt(response.data[0].careerPath))
        })
        let elems = document.getElementsByClassName("nav__section")
        Array.from(elems).forEach(elem => elem.style.color = "var(--opaqueWhite)")
        document.querySelector(".nav__section--Careers").style.color = "var(--light)"
    }, [])

    return (
        <div id="careers__page">
            <Nav user={user} userInfo={userInfo} />
            <div className="careers__page--container">
                <h1 className="careers__page--title">Browse Careers</h1>
                <h2 className="careers__page--sub-title">Your Major: {userInfo?.major}</h2>
                {/* <div className="careers__page--wrapper">
                    {
                        careers.filter(career => career.majors.includes(userInfo?.major)).map(career => {
                            return (
                                <div className="career__card">
                                    <h3 className="career__card--title">{career.title}</h3>
                                    <p className="career__card--major">Related to: {career.majors.join(', ')}</p>
                                    <br/>
                                    <p className="career__card--description">{career.description}</p>
                                    <br/>
                                    <p className="career__card--skills"><b>Skills:</b> {career.skills.join(', ')}</p>
                                    <p className="career__card--salary"><b>Average Salary:</b> {career.averageSalary}</p>
                                    <p className="career__card--job-outlook"><b>Job Outlook:</b> {career.jobOutlook}</p>
                                    <button className="btn--1" onClick={() => setCareerPath(career.id)}>{ careerPathId !== career.id ? "Follow" : "Following"}</button>
                                </div>
                            )
                        })
                    }
                </div>
                <h1 className="careers__page--sub-title">Search Careers</h1> */}
                <input type="text" placeholder="Search by major..." className="careers__search" onChange={
                    (e) => {
                        setCareersFilter(e.target.value)
                    }
                } />
                <div className="careers__page--wrapper">
                    {
                        careers.filter(career => career.majors.includes(careersFilter)).map(career => {
                            return (
                                <div className="career__card">
                                    <h3 className="career__card--title">{career.title}</h3>
                                    <p className="career__card--major">Related to: {career.majors.join(', ')}</p>
                                    <br/>
                                    <p className="career__card--description">{career.description}</p>
                                    <br/>
                                    <p className="career__card--skills"><b>Skills:</b> {career.skills.join(', ')}</p>
                                    <p className="career__card--salary"><b>Average Salary:</b> {career.averageSalary}</p>
                                    <p className="career__card--job-outlook"><b>Job Outlook:</b> {career.jobOutlook}</p>
                                    <button className="btn--1" onClick={() => setCareerPath(career.id)}>{ careerPathId !== career.id ? "Follow" : "Following"}</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default CareersPage;

/* 

title: "Software Developer",
description: "Software developers design, develop, and maintain software applications and systems for a wide range of industries and use cases.",
skills: ["Programming languages (e.g. Java, Python, JavaScript)", "Database management", "Problem-solving", "Collaboration", "Software development methodologies (e.g. Agile, Waterfall)"],
averageSalary: "$105,590 per year (US Bureau of Labor Statistics, 2020)",
jobOutlook: XXX

*/
