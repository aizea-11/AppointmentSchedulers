import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Enrollment = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [course, setCourse] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleEnrollment = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost/asbackend/enroll.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `fname=${encodeURIComponent(fname)}&lname=${encodeURIComponent(lname)}&course=${encodeURIComponent(course)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
            });
    
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            const result = await response.json();
            setMessage(result.message);
    
            if (result.status === 'success') {
                sessionStorage.clear();
            
                sessionStorage.setItem('userId', result.user_id);
                sessionStorage.setItem('firstName', fname);
                
                navigate('/dashboard');
            }            
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            setMessage("An error occurred during enrollment.");
        }
    };
    
    
    
    return (
        <div>
            <h1>Enrollment</h1>
            <form onSubmit={handleEnrollment}>
                <label htmlFor="fname">First Name</label><br />
                <input
                    type="text"
                    id="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                /><br /><br />

                <label htmlFor="lname">Last Name</label><br />
                <input
                    type="text"
                    id="lname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    required
                /><br /><br />

                <label htmlFor="course">Choose your Course</label><br />
                <select
                    id="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    required
                >
                    <option value="">--Select a Course--</option>
                    <option value="BSIT">Bachelor of Science in Information Technology</option>
                    <option value="BSCS">Bachelor of Science in Computer Science</option>
                    <option value="BSA">Bachelor of Science in Accountancy</option>
                    <option value="BSMA">Bachelor of Science in Management Accounting</option>
                </select><br /><br />

                <label htmlFor="email">Email</label><br />
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br /><br />

                <label htmlFor="password">Password</label><br />
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br /><br />

                <button type="submit">Enroll</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={() => navigate("/")}>Go to Login</button>
        </div>
    );
};

export default Enrollment;
