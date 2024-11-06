import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Accountingconpage.css';

const Accountingconpage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { date, timeSlot, concerns } = location.state || {};

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className='acccon-container'>
        <div className="accconfirmation-container">
            <h1>Booking Confirmed!</h1>
            <p className="accsuccess-message">Your appointment has been successfully booked.</p>
            {date && timeSlot ? (
                <div className="accappointment-details">
                    <h2>Appointment Details:</h2>
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Time Slot:</strong> {timeSlot}</p>
                    <p><strong>Concerns:</strong> {concerns}</p>
                </div>
            ) : (
                <p className="accno-details">No appointment details available.</p>
            )}
            <button type="button" onClick={goToDashboard} className="dashboard-btn">Go to Dashboard</button>
        </div>
        </div>
    );
};

export default Accountingconpage;
