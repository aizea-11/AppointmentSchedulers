import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Bullexadmin.css'

function BullexAdmin() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);


  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost/asbackend/getbullexapp.php');
      const data = await response.json();
      if (data.status === 'success') {
        setBookings(data.bookings);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch bookings');
    }
  };

  const goBack = () => {
    window.location.href = '/departments';
  };

  return (
    <div className="bulladmin-container">
        <div className="headerbulladmin-box">
            <h1>Bulldog Exchange Admin</h1>
            <button className='gobackBulladmin' onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} size="1x" />
            Back to Department Panel
            </button>
        </div>

        {error && <p className="error">{error}</p>}
    <div className="bulladmin-card">
        <div className="bullad-container">
            <div className="bulladrow-one">
                <h2>Bookings</h2>
                <table border="1">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time Slot</th>
                        <th>User ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                        <td>{booking.date}</td>
                        <td>{booking.time_slot}</td>
                        <td>{booking.user_id}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                </div>
            </div>    
    </div>        
  );
}

export default BullexAdmin;
