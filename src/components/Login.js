import React, { useState } from 'react';
import { userApi } from '../api/userApi';

const Login = ({ onLoginSuccess }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!phone.trim() || !otp.trim()) {
      setError('Phone number and OTP are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await userApi.login(phone, otp);
      if (data && data.token) {
        onLoginSuccess(data.token);
      } else {
        setError('Login failed: No token received.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <img src="/logo copy.jpg" className="logo" alt="Logo" />
      <h2>Admin Login</h2>
      
      <div className="section">
        <label htmlFor="phoneInput">Phone Number</label>
        <input
          type="tel"
          id="phoneInput"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="section">
        <label htmlFor="otpInput">OTP</label>
        <input
          type="password"
          id="otpInput"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
      </div>

      {error && <div className="error" style={{ marginBottom: '15px' }}>{error}</div>}
      
      <div className="section">
        <button 
          className="action-btn" 
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login; 