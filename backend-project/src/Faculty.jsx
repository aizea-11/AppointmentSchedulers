import React from 'react';
import { useNavigate } from 'react-router-dom';

const Faculty = () => {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToFacultyapp = () => {
        navigate('/facultyapp');
    };

    return (
        <div>
            <button type="submit" onClick={goToDashboard}>Dashboard</button>
            <br /><br />
            <br /><br />
            <button type="submit" onClick={goToFacultyapp}>Book An Appointment</button>
            <br /><br />
        </div>
    );
};

export default Faculty;