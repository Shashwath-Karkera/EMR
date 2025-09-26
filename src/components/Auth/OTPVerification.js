import React, { useState, useEffect, useRef } from 'react';
import './Auth.css';

const OTPVerification = ({ userData, onVerifyOTP, onBack, onResendOTP, isLoading }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Debug: Auto-fill OTP for testing
  useEffect(() => {
    // Auto-fill with test OTP after component mounts
    const autoFillTimer = setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        const testOTP = '123456'.split('');
        setOtp(testOTP);
        console.log('Auto-filled test OTP: 123456');
      }
    }, 1000);

    return () => clearTimeout(autoFillTimer);
  }, []);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Auto-submit when all digits are entered
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split('').concat(Array(6 - pasteData.length).fill(''));
      setOtp(newOtp);
    }
  };

  const handleVerify = async (otpCode = null) => {
    const code = otpCode || otp.join('');
    if (code.length !== 6) return;

    try {
      await onVerifyOTP(code);
    } catch (error) {
      console.error('Verification failed:', error);
      // Don't clear OTP on error, let user correct it
    }
  };

  const handleResendOTP = async () => {
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    await onResendOTP();
  };

  // Debug function to bypass OTP
  const handleBypassOTP = () => {
    const testOTP = '123456';
    setOtp(testOTP.split(''));
    handleVerify(testOTP);
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="medicare-header text-center">
          <h1 className="medicare-logo">Medicare</h1>
         
        </div>
        
        <div className="auth-card">
          <div className="card-body">
            <button type="button" className="back-button" onClick={onBack}>
              ← Back
            </button>
            
            <h2 className="text-center auth-title">Verify OTP</h2>
            <p className="text-center auth-subtitle">
              Enter the 6-digit code sent to<br />
              <strong>{userData.email}</strong>
            </p>
            
            <div className="user-info-card">
              <div className="user-avatar">{userData.userType.charAt(0)}</div>
              <div className="user-details">
                <div className="user-role">{userData.userType}</div>
                <div className="user-name">{userData.username}</div>
                <div className="user-email">{userData.email}</div>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }} className="auth-form">
              <div className="otp-container">
                <label className="form-label">Enter 6-digit OTP</label>
                <div className="otp-inputs">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => inputRefs.current[index] = el}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="otp-input"
                      required
                      disabled={isLoading}
                    />
                  ))}
                </div>
                <small className="input-hint">
                  For testing, use: <strong>123456</strong>
                </small>
              </div>

              <div className="otp-timer">
                {timer > 0 ? (
                  <span>Resend OTP in {timer}s</span>
                ) : (
                  <button type="button" className="link-button" onClick={handleResendOTP}>
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="auth-actions">
                <button 
                  type="submit" 
                  className="auth-button primary"
                  disabled={isLoading || otp.join('').length !== 6}
                >
                  {isLoading ? (
                    <>
                      <span className="button-spinner"></span>
                      Verifying...
                    </>
                  ) : (
                    'Verify & Login'
                  )}
                </button>

                {/* Debug button for development */}
                {process.env.NODE_ENV === 'development' && (
                  <button 
                    type="button" 
                    className="auth-button secondary"
                    onClick={handleBypassOTP}
                    style={{marginTop: '10px'}}
                  >
                    🚀 Quick Test (Use 123456)
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;