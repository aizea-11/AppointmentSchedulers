import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Facultyconpage.css';

const Facultyconpage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { date, timeSlot, faculty } = location.state || {};

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className='faccon-container'>
        <div className="facconfirmation-container">
            <h1>Booking Confirmed!</h1>
            <p className="facsuccess-message">Your appointment has been successfully booked.</p>
            {date && timeSlot ? (
                <div className="facappointment-details">
                    <h2>Appointment Details:</h2>
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Time Slot:</strong> {timeSlot}</p>
                    <p><strong>Professor:</strong> {faculty}</p>
                </div>
            ) : (
                <p className="facno-details">No appointment details available.</p>
            )}
            <button type="button" onClick={goToDashboard} className="dashboard-btn">Go to Dashboard</button>
        </div>
        </div>
    );
};

export default Facultyconpage;
