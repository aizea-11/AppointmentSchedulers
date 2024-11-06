import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Book } from "lucide-react"; 
import './Enrollment.css';

const Enrollment = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [course, setCourse] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
        <div className="enrollment-container">
            <div className="enrollment-form">
                <h2 className="enrollform-title">Enrollment</h2>
                <form onSubmit={handleEnrollment}>
                    <div className="enrollinput-group">
                        <User className="enrollinput-icon" />
                        <input
                            type="text"
                            id="fname"
                            value={fname}
                            className="enrollform-input"
                            placeholder="First Name"
                            onChange={(e) => setFname(e.target.value)}
                            required
                        />
                    </div>

                    <div className="enrollinput-group">
                        <User className="enrollinput-icon" />
                        <input
                            type="text"
                            id="lname"
                            value={lname}
                            className="enrollform-input"
                            placeholder="Last Name"
                            onChange={(e) => setLname(e.target.value)}
                            required
                        />
                    </div>

                    <div className="enrollinput-group">
                        <Book className="enrollinput-icon" />
                        <select
                            id="course"
                            value={course}
                            className="enrollcform-input"
                            onChange={(e) => setCourse(e.target.value)}
                            required
                        >
                            <option value="">--Select a Course--</option>
                            <option value="BSIT">Bachelor of Science in Information Technology</option>
                            <option value="BSCS">Bachelor of Science in Computer Science</option>
                            <option value="BSA">Bachelor of Science in Accountancy</option>
                            <option value="BSMA">Bachelor of Science in Management Accounting</option>
                        </select>
                    </div>

                    <div className="enrollinput-group">
                        <Mail className="enrollinput-icon" />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            className="enrollform-input"
                            placeholder="Enter your Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="enrollinput-group">
                        <Lock className="enrollinput-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            className="enrollform-input"
                            placeholder="Enter your Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </span>
                    </div>

                    <button type="submit" className="btn-enroll">Enroll</button>
                </form>
                {message && <p className="enrollment-message">{message}</p>}
                <button className="logbtn-login" onClick={() => navigate("/")}>
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default Enrollment;
