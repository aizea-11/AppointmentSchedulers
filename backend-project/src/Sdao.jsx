import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sdao = () => {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToSdaoapp = () => {
        navigate('/sdaoapp');
    };

    return (
        <div>
            <button type="submit" onClick={goToDashboard}>Dashboard</button>
            <br /><br />
            <br /><br />
            <button type="submit" onClick={goToSdaoapp}>Book An Appointment</button>
            <br /><br />
        </div>
    );
};

export default Sdao;