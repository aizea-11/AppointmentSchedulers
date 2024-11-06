import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Sdaoconpage.css';

const Sdaoconpage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { date, timeSlot, concernssdao } = location.state || {};

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className='sdaocon-container'>
        <div className="sdaoconfirmation-container">
            <h1>Booking Confirmed!</h1>
            <p className="sdaosuccess-message">Your appointment has been successfully booked.</p>
            {date && timeSlot ? (
                <div className="sdaoappointment-details">
                    <h2>Appointment Details:</h2>
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Time Slot:</strong> {timeSlot}</p>
                    <p><strong>Concerns:</strong> {concernssdao}</p>
                </div>
            ) : (
                <p className="sdaono-details">No appointment details available.</p>
            )}
            <button type="button" onClick={goToDashboard} className="dashboard-btn">Go to Dashboard</button>
        </div>
        </div>
    );
};

export default Sdaoconpage;
