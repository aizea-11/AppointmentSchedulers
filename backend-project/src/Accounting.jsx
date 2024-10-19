import React from 'react';
import { useNavigate } from 'react-router-dom';

const Accounting = () => {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToAccountingapp = () => {
        navigate('/accountingapp');
    };

    return (
        <div>
            <button type="submit" onClick={goToDashboard}>Dashboard</button>
            <br /><br />
            <br /><br />
            <button type="submit" onClick={goToAccountingapp}>Book An Appointment</button>
            <br /><br />
        </div>
    );
};

export default Accounting;