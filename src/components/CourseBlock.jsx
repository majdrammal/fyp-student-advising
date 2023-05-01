import React from 'react';

const CourseBlock = ({ courseNumber, beginTime, endTime }) => {
    return (
        <div style={{height: `${(50/60)*100}%`}} className="course__block">
            <p>EECE {courseNumber}</p>
            <p>{beginTime} - {endTime}</p>
        </div>
    );
}

export default CourseBlock;
