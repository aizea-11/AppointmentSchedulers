import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/');
    };

    const goToFaculty = () => {
        navigate('/faculty');
    };

    const goToSdao = () => {
        navigate('/sdao');
    };

    const goToItso = () => {
        navigate('/itso');
    };

    const goToBulldogex = () => {
        navigate('/bulldogex');
    };

    const goToAccounting = () => {
        navigate('/accounting');
    };

    const handleLogout = () => {
        // Optionally clear sessionStorage on logout
        sessionStorage.clear(); // Clear session storage if needed
        navigate('/');
    };

    // Get the first name from session storage
    const firstName = sessionStorage.getItem('firstName');

    return (
        <div>
            <button type="submit" onClick={goToLogin}>Login</button>
            <br /><br />
            <h1>Hello, {firstName ? firstName : 'User'}!</h1>
            <p>Welcome to your dashboard.</p>
            <br /><br />
            <button type="submit" onClick={goToFaculty}>Faculty</button>
            <br /><br />
            <button type="submit" onClick={goToSdao}>Student's Discipline Office</button>
            <br /><br />
            <button type="submit" onClick={goToItso}>ITSO</button>
            <br /><br />
            <button type="submit" onClick={goToBulldogex}>Bulldog Exchange</button>
            <br /><br />
            <button type="submit" onClick={goToAccounting}>Accounting</button>
            <br /><br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
