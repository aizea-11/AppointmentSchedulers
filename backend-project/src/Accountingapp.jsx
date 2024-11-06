import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Accountingapp.css';

const Accountingapp = () => {
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [concerns, setConcerns] = useState('');
    const [availableConcerns, setAvailableConcerns] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error('User ID is not available');
            navigate('/login'); 
        }
    }, [navigate]);

    useEffect(() => {
        if (date) {
            setBookedSlots([]);
            fetchBookedTimeSlots();
        }
    }, [date]);

    useEffect(() => {
        fetchConcerns();
    }, []);

    const fetchConcerns = async () => {
        try {
            const response = await fetch('http://localhost/asbackend/getconcernsacc.php');
            const data = await response.json();

            if (data.status === 'success') {
                setAvailableConcerns(data.concerns);
            } else {
                console.error('Failed to fetch concerns:', data.message);
            }
        } catch (error) {
            console.error('Error fetching concerns:', error);
        }
    };

    const fetchBookedTimeSlots = async () => {
        try {
            const response = await fetch(`http://localhost/asbackend/availtimeacc.php?date=${date}`);
            const data = await response.json();

            if (data.status === 'success') {
                setBookedSlots(data.booked_slots); 
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error fetching booked time slots:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!userId) {
            console.error('User ID is not defined during submit');
            return; 
        }

        const formData = new URLSearchParams();
        formData.append('date', date);
        formData.append('time_slot', timeSlot);
        formData.append('concerns', concerns);
        formData.append('user_id', userId);

        try {
            const response = await fetch('http://localhost/asbackend/accountingapp.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            const data = await response.json();
            alert(data.message);

            if (data.status === 'success') {
                navigate('/accountingconpage', { state: { date, timeSlot, concerns} });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isBooked = (slot) => bookedSlots.includes(slot);

    return (
        <div className='accapp-container'>
        <form id="appointmentForm" onSubmit={handleSubmit} className="accappointment-form">
            <h2>Book an Appointment</h2>
            
            <label htmlFor="concerns">Concerns:</label>
            <select 
                id="concerns" 
                value={concerns} 
                onChange={(e) => setConcerns(e.target.value)}
                required
                className="accappform-input"
            >
                <option value="">--Select a Concern--</option>
                {availableConcerns.map((concern) => (
                    <option key={concern.id} value={concern.name}>
                        {concern.name}
                    </option>
                ))}
            </select>

            <label htmlFor="date">Select Date:</label>
            <input 
                type="date" 
                id="date" 
                name="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
                className="accappformdate-input"
            />

            <label htmlFor="time_slot">Select Time Slot:</label>
            <select 
                id="time_slot" 
                name="time_slot" 
                value={timeSlot} 
                onChange={(e) => setTimeSlot(e.target.value)} 
                required
                className="accappform-input"
            >
                <option value="">--Select a Time--</option>
                {["08:00:00", "09:00:00", "10:00:00", "11:00:00", "13:00:00", "14:00:00", "15:00:00"].map((slot) => (
                    <option key={slot} value={slot} disabled={isBooked(slot)}>
                        {slot} {isBooked(slot) ? "(Booked)" : ""}
                    </option>
                ))}
            </select>

            <button type="submit" disabled={!timeSlot || isBooked(timeSlot)} className="accappsubmit-btn">Book Appointment</button>
        </form>
        </div>    
    );
};

export default Accountingapp;
