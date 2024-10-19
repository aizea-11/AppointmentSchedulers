import React from 'react';
import { useNavigate } from 'react-router-dom';

const Bulldogex = () => {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToBulldogexapp = () => {
        navigate('/bulldogexapp');
    };

    return (
        <div>
            <button type="submit" onClick={goToDashboard}>Dashboard</button>
            <br /><br />
            <br /><br />
            <button type="submit" onClick={goToBulldogexapp}>Book An Appointment</button>
            <br /><br />
        </div>
    );
};

export default Bulldogex;