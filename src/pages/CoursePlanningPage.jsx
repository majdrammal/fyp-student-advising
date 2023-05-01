import React, { useEffect } from 'react';
import TermTable from '../components/TermTable';
import Nav from '../components/Nav';

const CoursePlanningPage = ({ userInfo }) => {

    useEffect(() => {
        let elems = document.getElementsByClassName("nav__section")
        Array.from(elems).forEach(elem => elem.style.color = "var(--opaqueWhite)")
        document.querySelector(".nav__section--Planning").style.color = "var(--light)"
    }, [])

    return (
        <div id="planning">
            <Nav userInfo={userInfo} />
            <div className="planning__container">
                <h1>Course Planning</h1>
                <TermTable 
                    term="I"
                    season="Fall"
                    courses={[
                        {
                            number: "FEAA 200",
                            desc: "Introduction to Engineering and Architecture",
                            credits: 3
                        },
                        {
                            number: "EECE 210",
                            desc: "Electric Circuits",
                            credits: 3
                        },
                        {
                            number: "ENGL 203",
                            desc: "Academic English",
                            credits: 3
                        },
                        {
                            number: "MATH 201",
                            desc: "Calculus and Analytic Geomtery",
                            credits: 3
                        },
                        {
                            number: "MATH/CMPS 211",
                            desc: "Discrete Structuress",
                            credits: 3
                        }
                    ]}
                />
                <TermTable 
                    term="II"
                    season="Spring"
                    courses={[
                        {
                            number: "EECE 230",
                            desc: "Introduction to Programming",
                            credits: 3
                        },
                        {
                            number: "EECE 290",
                            desc: "Analog Signal Processing",
                            credits: 3
                        },
                        {
                            number: "MATH 202",
                            desc: "Differential Equations",
                            credits: 3
                        },
                        {
                            number: "MATH 218/219",
                            desc: "Linear Algebra",
                            credits: 3
                        },
                        {
                            number: "PHYS 210",
                            desc: "Introductory Physics II",
                            credits: 3
                        },
                        {
                            number: "PHYS 210L",
                            desc: "Introductory Physics Laboratory II",
                            credits: 1
                        },
                    ]}
                />
                <TermTable 
                    term="III"
                    season="Summer"
                    courses={[
                        {
                            number: "CHEM 201/202",
                            desc: "Chemistry Course",
                            credits: 3
                        },
                        {
                            number: "CHEM 203/205",
                            desc: "Chemistry Laboratory",
                            credits: 2
                        },
                        {
                            number: "XXXX",
                            desc: "Humanities Course",
                            credits: 3
                        }
                    ]}
                />
                <TermTable 
                    term="VII"
                    season="Fall"
                    courses={[
                        {
                            number: "EECE 442",
                            desc: "Communication Systems",
                            credits: 3
                        },
                        {
                            number: "MATH",
                            desc: "Elective",
                            credits: 3
                        },
                        {
                            number: "INDE 301",
                            desc: "Engineering Economy",
                            credits: 3
                        },
                        {
                            number: "Choice-300-400",
                            desc: "",
                            credits: 0
                        },
                        {
                            number: "Choice-300-400",
                            desc: "",
                            credits: 0
                        }
                    ]}
                />
            </div>
        </div>
    );
}

export default CoursePlanningPage;
