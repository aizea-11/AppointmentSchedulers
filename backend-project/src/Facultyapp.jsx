import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Facultyapp = () => {
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [faculty, setFaculty] = useState('');
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]); 
    const [bookedSlots, setBookedSlots] = useState([]); 
    const [userId, setUserId] = useState(null);
    const [professors, setProfessors] = useState([]);  
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
        fetchProfessor();
    }, []);

    const fetchProfessor = async () => {
        try {
            const response = await fetch('http://localhost/asbackend/getproffac.php');
            const data = await response.json();

            if (data.status === 'success') {
                setProfessors(data.concernsfac);
            } else {
                console.error('Failed to fetch professors:', data.message);
            }
        } catch (error) {
            console.error('Error fetching professors:', error);
        }
    };

    const fetchBookedTimeSlots = async () => {
        try {
            const response = await fetch(`http://localhost/asbackend/availtimefaculty.php?date=${date}`);
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
        formData.append('faculty', faculty);
        formData.append('user_id', userId);

        try {
            const response = await fetch('http://localhost/asbackend/facultyapp.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            const data = await response.json();
            alert(data.message);

            if (data.status === 'success') {
                navigate('/facultyconpage', { state: { date, timeSlot, faculty } });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isBooked = (slot) => bookedSlots.includes(slot);

    return (
        <form id="appointmentForm" onSubmit={handleSubmit}>
            <label htmlFor="professor">Select Professor:</label><br />
            <select 
                id="professor" 
                value={faculty} 
                onChange={(e) => setFaculty(e.target.value)}
                required
            >
                <option value="">--Select a Professor--</option>
                {professors.map((prof) => (
                    <option key={prof.id} value={prof.name}>
                        {prof.name}
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

            <button type="submit">Book Appointment</button>
        </form>
    );
};

export default Facultyapp;
