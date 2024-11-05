import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Facadmin.css';

function FacultyAdmin() {
  const [concernsfac, setProf] = useState([]);
  const [newProf, setNewProf] = useState('');
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfessor();
    fetchBookings();
  }, []);

  const fetchProfessor = async () => {
    try {
      const response = await fetch('http://localhost/asbackend/getproffac.php');
      const data = await response.json();
      if (data.status === 'success') {
        setProf(data.concernsfac);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch concerns');
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost/asbackend/getfacapp.php');
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

  const addProf = async () => {
    try {
      const response = await fetch('http://localhost/asbackend/addproffac.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProf }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        fetchProfessor();
        setNewProf('');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to add professor');
    }
  };

  const removeProf = async (id) => {
    try {
      const response = await fetch('http://localhost/asbackend/removeproffac.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        fetchProfessor();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to remove professor');
    }
  };

  const goBackFacadmin = () => {
    window.location.href = '/departments';
  };

  return (
    <div className="facadmin-container">
        <div className="headerfacadmin-box">
            <h1>Faculty Admin</h1>
            <button className='goBackFacadmin' onClick={goBackFacadmin}>
            <FontAwesomeIcon icon={faArrowLeft} size="1x" />
            Back to Department Panel
            </button>
        </div>

        {error && <p className="error">{error}</p>}
    <div className="facadmin-card">
        <div className="facad-container">
            <div className="facadrow-one">
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
                        <td>{booking.faculty}</td>
                        <td>{booking.user_id}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
                <div className="facadrow-two">
                <h2>Manage Professors</h2>
                <table border="1">
                    <thead>
                    <tr>
                        <th>Professors</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {concernsfac.map((prof) => (
                        <tr key={prof.id}>
                        <td>{prof.name}</td>
                        <td>
                            <button onClick={() => removeProf(prof.id)}><FontAwesomeIcon icon={faTrash} size="1x" /></button>
                        </td>
                        </tr>
                    ))}
                    <br />
                    <tr>
                        <td>
                        <input
                            type="text"
                            placeholder="New Professor"
                            value={newProf}
                            onChange={(e) => setNewProf(e.target.value)}
                        />
                        </td>
                        <td>
                        <button onClick={addProf}><FontAwesomeIcon icon={faPlus} size="1x" /></button>
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

export default FacultyAdmin;
