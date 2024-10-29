import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const adminCredentials = {
    email: 'admin@nudasma.com',
    password: 'admin123',
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === adminCredentials.email && password === adminCredentials.password) {
      sessionStorage.setItem('userId', 'admin');
      sessionStorage.setItem('firstName', 'Admin');
      
      navigate('/admin');
      return;
    }

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
    <div className="login-container">
      <div className="login-form">
        <h1 className="form-title">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <Mail className="input-icon" />
            <input
              type="email"
              id="email"
              value={email}
              className="form-input"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              className="form-input"
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

          <button type="submit" className="btn-login">Login</button>
        </form>
        {message && <p className="login-message">{message}</p>}
        <button className="btn-enrollment" onClick={() => navigate("/enrollment")}>
          Enroll Now!
        </button>
      </div>
    </div>
  );
};

export default Login;
