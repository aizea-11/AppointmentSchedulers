import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Accadmin.css';

function AccountingAdmin() {
  const [concerns, setConcerns] = useState([]);
  const [newConcern, setNewConcern] = useState('');
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConcerns();
    fetchBookings();
  }, []);

  const fetchConcerns = async () => {
    try {
      const response = await fetch('http://localhost/asbackend/getconcernsacc.php');
      const data = await response.json();
      if (data.status === 'success') {
        setConcerns(data.concerns);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch concerns');
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost/asbackend/getaccapp.php');
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

  const addConcern = async () => {
    try {
      const response = await fetch('http://localhost/asbackend/addconcernsacc.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newConcern }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        fetchConcerns();
        setNewConcern('');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to add concern');
    }
  };

  const removeConcern = async (id) => {
    try {
      const response = await fetch('http://localhost/asbackend/removeconcernsacc.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        fetchConcerns();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to remove concern');
    }
  };

  const goBack = () => {
    window.location.href = '/departments';
  };

  return (
    <div className="accadmin-container">
        <div className="headeraccadmin-box">
            <h1>Accounting Admin</h1>
            <button className='gobackAccadmin' onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} size="1x" />
            Back to Department Panel
            </button>
        </div>

        {error && <p className="error">{error}</p>}
    <div className="accadmin-card">
        <div className="accad-container">
            <div className="accadrow-one">
                <h2>Bookings</h2>
                <table border="1">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time Slot</th>
                        <th>Concern</th>
                        <th>User ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                        <td>{booking.date}</td>
                        <td>{booking.time_slot}</td>
                        <td>{booking.concerns}</td>
                        <td>{booking.user_id}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
                <div className="accadrow-two">
                <h2>Manage Concerns</h2>
                <table border="1">
                    <thead>
                    <tr>
                        <th>Concern</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {concerns.map((concern) => (
                        <tr key={concern.id}>
                        <td>{concern.name}</td>
                        <td>
                            <button onClick={() => removeConcern(concern.id)}><FontAwesomeIcon icon={faTrash} size="1x" /></button>
                        </td>
                        </tr>
                    ))}
                    <br />
                    <tr>
                        <td>
                        <input
                            type="text"
                            placeholder="New Concern"
                            value={newConcern}
                            onChange={(e) => setNewConcern(e.target.value)}
                        />
                        </td>
                        <td>
                        <button onClick={addConcern}><FontAwesomeIcon icon={faPlus} size="1x" /></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                </div>
            </div>    
        </div>        
    </div>
  );
}

export default AccountingAdmin;
