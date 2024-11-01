import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Facultyconpage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { date, timeSlot, faculty } = location.state || {};

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div>
            <h1>Booking Confirmed!</h1>
            <p>Your appointment has been successfully booked.</p>
            {date && timeSlot ? (
                <div>
                    <h2>Appointment Details:</h2>
                    <p>Date: {date}</p>
                    <p>Time Slot: {timeSlot}</p>
                    <p>Professor: {faculty}</p>
                </div>
            ) : (
                <p>No appointment details available.</p>
            )}
            <br /><br />
            <button type="button" onClick={goToDashboard}>Go to Dashboard</button>
        </div>
    );
};

export default Facultyconpage;
