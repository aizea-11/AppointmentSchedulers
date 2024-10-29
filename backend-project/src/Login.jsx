import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost/asbackend/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ email, password }).toString(),
        });

        const result = await response.json();
        setMessage(result.message);

        if (result.status === 'success') {
            sessionStorage.setItem('userId', result.user_id);
            sessionStorage.setItem('firstName', result.first_name);

            navigate('/dashboard');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
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

                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={() => navigate("/enrollment")}>Go to Enrollment</button>
        </div>
    );
};

export default Login;
