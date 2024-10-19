import React from 'react';
import { useNavigate } from 'react-router-dom';

const Itso = () => {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToItsoapp = () => {
        navigate('/itsoapp');
    };

    return (
        <div>
            <button type="submit" onClick={goToDashboard}>Dashboard</button>
            <br /><br />
            <br /><br />
            <button type="submit" onClick={goToItsoapp}>Book An Appointment</button>
            <br /><br />
        </div>
    );
};

export default Itso;