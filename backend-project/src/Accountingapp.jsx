import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Accountingapp = () => {
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [concerns, setConcerns] = useState('');
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

        console.log('User ID:', userId); 

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
        <form id="appointmentForm" onSubmit={handleSubmit}>
            <label htmlFor="concerns">Concerns:</label><br />
            <select 
                id="concerns" 
                value={concerns} 
                onChange={(e) => setConcerns(e.target.value)}
                required
            >
                <option value="">--Select a Concerns--</option>
                <option value="Tuition">Tuition</option>
                <option value="Tour">Tour</option>
            </select>

            <label htmlFor="date">Select Date:</label>
            <input 
                type="date" 
                id="date" 
                name="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
            />

            <label htmlFor="time_slot">Select Time Slot:</label>
            <select 
                id="time_slot" 
                name="time_slot" 
                value={timeSlot} 
                onChange={(e) => setTimeSlot(e.target.value)} 
                required
            >
                <option value="">--Select a Time--</option>
                {["08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00"].map((slot) => (
                    <option key={slot} value={slot} disabled={isBooked(slot)}>
                        {slot} {isBooked(slot) ? "(Booked)" : ""}
                    </option>
                ))}
            </select>

            <button type="submit" disabled={!timeSlot || isBooked(timeSlot)}>Book Appointment</button>
        </form>
    );
};

export default Accountingapp;
