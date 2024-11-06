import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Itsoconpage.css';

const Itsoconpage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { date, timeSlot, concerns } = location.state || {};

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className='itsocon-container'>
        <div className="itsoconfirmation-container">
            <h1>Booking Confirmed!</h1>
            <p className="itsosuccess-message">Your appointment has been successfully booked.</p>
            {date && timeSlot ? (
                <div className="itsoappointment-details">
                    <h2>Appointment Details:</h2>
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Time Slot:</strong> {timeSlot}</p>
                </div>
            ) : (
                <p className="itsono-details">No appointment details available.</p>
            )}
            <button type="button" onClick={goToDashboard} className="dashboard-btn">Go to Dashboard</button>
        </div>
        </div>
    );
};

export default Itsoconpage;
