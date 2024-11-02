import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './User.css';

function User() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ fname: '', lname: '', course: '', email: '', password: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost/asbackend/getUsers.php');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError('Failed to fetch users');
    }
  };

  const addUser = async () => {
    try {
      const response = await fetch('http://localhost/asbackend/addUsers.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const result = await response.json();
      if (result.status === 'success') {
        fetchUsers();
        setNewUser({ fname: '', lname: '', course: '', email: '', password: '' });
      } else {
        setError(result.message || 'Failed to add user');
      }
    } catch (error) {
      setError('An error occurred while adding user');
    }
  };

  const removeUser = async (id) => {
    try {
      const response = await fetch('http://localhost/asbackend/removeUsers.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        fetchUsers();
      } else {
        setError(result.message || 'Failed to remove user');
      }
    } catch (error) {
      setError('An error occurred while removing user');
    }
  };

  const goBack = () => {
    window.location.href = '/admin';
  };

  return (
    <div className='user-container'>
      <div className="headeruser-box">
        <div className="welcomeuser-section">
            <h1>Users</h1>
            <button className='gobackUser' onClick={goBack}>
              <FontAwesomeIcon icon={faArrowLeft} size="1x" />
              Back to Admin Panel
            </button>
        </div>
      </div>
    
      <div className="menuuser-card">
        <div className="menuuser-container"> 
          <div className="rowuser">
            <h2>Enrolled Users</h2>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Course</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.fname}</td>
                    <td>{user.lname}</td>
                    <td>{user.course}</td>
                    <td>{user.email}</td>
                    <td>
                      <button onClick={() => removeUser(user.id)}><FontAwesomeIcon icon={faTrash} size="1x" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
  
            {error && <p className="error">{error}</p>}
      
            <div className="add-user-section">
              <h3>Add New User</h3>
              <input
                type="text"
                placeholder="First Name"
                value={newUser.fname}
                onChange={(e) => setNewUser({ ...newUser, fname: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newUser.lname}
                onChange={(e) => setNewUser({ ...newUser, lname: e.target.value })}
              />
              <input
                type="text"
                placeholder="Course"
                value={newUser.course}
                onChange={(e) => setNewUser({ ...newUser, course: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
              <button onClick={addUser}><FontAwesomeIcon icon={faPlus} size="1x" /></button>
            </div>
          </div>
        </div>
      </div>  
    </div>  
  );
}

export default User;
