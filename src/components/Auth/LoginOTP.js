import React, { useState } from 'react';
import './Auth.css';

const LoginOTP = ({ onSendOTP, switchToRegister, isLoading }) => {
  const [userType, setUserType] = useState('Doctor');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const userTypes = [
    { value: 'Doctor', label: 'Doctor', badge: '⏱️ Appointment' },
    { value: 'Patient', label: 'Patient', badge: '👤 Care' },
    { value: 'EMT', label: 'EMT', badge: '⏱️ Emergency' },
    { value: 'Receptionist', label: 'Receptionist', badge: '📅 Schedule' },
    { value: 'Admin', label: 'Admin', badge: '⚙️ System' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    await onSendOTP({ userType, username, email });
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Medicare Logo Section */}
        <div className="medicare-header text-center">
          <h1 className="medicare-logo">Medicare</h1>
          
        </div>
        
        {/* Login Card */}
        <div className="auth-card">
          <div className="card-body">
            <h2 className="text-center auth-title">Login with OTP</h2>
            <p className="text-center auth-subtitle">Enter Your Username and Email</p>
            
            {/* User Type Selection */}
            <div className="user-type-section">
              <label className="section-label">Select Your Role</label>
              <div className="user-type-grid">
                {userTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    className={`user-type-card ${userType === type.value ? 'active' : ''}`}
                    onClick={() => setUserType(type.value)}
                    disabled={isLoading}
                  >
                    <span className="user-type-label">{type.label}</span>
                    <span className="user-badge">{type.badge}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              {/* Username */}
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-input"
                  disabled={isLoading}
                />
              </div>
              
              {/* Email */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  disabled={isLoading}
                />
                <small className="input-hint">OTP will be sent to this email</small>
              </div>
              
              {/* Submit Button */}
              <div className="auth-actions">
                <button 
                  type="submit" 
                  className="auth-button primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="button-spinner"></span>
                      Sending OTP...
                    </>
                  ) : (
                    'Send OTP'
                  )}
                </button>
                
                <div className="auth-switch">
                  <span>Don't have an account? </span>
                  <button type="button" className="link-button" onClick={switchToRegister}>
                    Register here
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOTP;