import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bulldogexapp.css';

const Bulldogexapp = () => {
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
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

    const fetchBookedTimeSlots = async () => {
        try {
            const response = await fetch(`http://localhost/asbackend/availtimebull.php?date=${date}`);
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
        formData.append('user_id', userId);

        try {
            const response = await fetch('http://localhost/asbackend/bulldogexapp.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            const data = await response.json();
            alert(data.message);

            if (data.status === 'success') {
                navigate('/bulldogexconpage', { state: { date, timeSlot } });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isBooked = (slot) => bookedSlots.includes(slot);

    return (
        <div className="bulldogexapp-container">
            <form id="appointmentForm" onSubmit={handleSubmit} className="bulldogexapp-form">
                <h2>Bulldogex Appointment Booking</h2>

                <label htmlFor="date">Select Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="bulldogexapp-date-input"
                />

                <label htmlFor="time_slot">Select Time Slot:</label>
                <select
                    id="time_slot"
                    name="time_slot"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    required
                    className="bulldogexapp-input"
                >
                    <option value="">--Select a Time--</option>
                    {["08:00:00", "09:00:00", "10:00:00", "11:00:00", "13:00:00", "14:00:00", "15:00:00"].map((slot) => (
                        <option key={slot} value={slot} disabled={isBooked(slot)}>
                            {slot} {isBooked(slot) ? "(Booked)" : ""}
                        </option>
                    ))}
                </select>

                <button type="submit" disabled={!timeSlot || isBooked(timeSlot)} className="bulldogexapp-submit-btn">Book Appointment</button>
            </form>
        </div>
    );
};

export default Bulldogexapp;
