import React, { useState, useEffect } from 'react';
import SplashScreen from './components/Auth/SplashScreen';
import LoginOTP from './components/Auth/LoginOTP';
import OTPVerification from './components/Auth/OTPVerification';
import Dashboard from './components/Dashboard/Dashboard';
import AuthService from './services/authService';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('splash');
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (only on app start)
    const user = AuthService.getCurrentUser();
    if (user && currentView === 'splash') {
      setCurrentUser(user);
    }
  }, [currentView]);

  const handleSplashFinish = () => {
    if (currentUser) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('login');
    }
  };

  const handleSendOTP = async (data) => {
    setIsLoading(true);
    try {
      const result = await AuthService.sendOTP(data);
      setUserData(data);
      setCurrentView('otp');
      console.log('OTP sent:', result);
      
      // Show OTP for testing
      alert(`OTP for testing: ${result.testOTP}\n\nUse this code or 123456 to login`);
    } catch (error) {
      alert('Failed to send OTP. Please try again.');
      console.error('OTP error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp) => {
    setIsLoading(true);
    try {
      console.log('Verifying OTP:', otp);
      const result = await AuthService.verifyOTP(otp);
      console.log('Verification result:', result);
      
      setCurrentUser(result.user);
      setCurrentView('dashboard');
    } catch (error) {
      alert(error.message || 'Verification failed. Please try again.');
      console.error('Verification error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const result = await AuthService.resendOTP(userData);
      alert(`New OTP sent: ${result.testOTP}\n\nUse this code or 123456`);
    } catch (error) {
      alert('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setUserData(null);
    setCurrentView('login');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
    setUserData(null);
  };

  const switchToRegister = () => {
    alert('Registration feature coming soon!');
  };

  // Show splash screen first
  if (currentView === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // Debug panel for development
  const DebugPanel = () => (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 1000
    }}>
      <div>Current View: {currentView}</div>
      <div>User: {currentUser ? currentUser.username : 'None'}</div>
      <button 
        onClick={() => {
          AuthService.logout();
          setCurrentUser(null);
          setCurrentView('login');
        }}
        style={{marginTop: '5px', padding: '5px'}}
      >
        Force Logout
      </button>
    </div>
  );

  return (
    <div className="App">
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
      
      {currentView === 'login' && (
        <LoginOTP 
          onSendOTP={handleSendOTP}
          switchToRegister={switchToRegister}
          isLoading={isLoading}
        />
      )}
      
      {currentView === 'otp' && userData && (
        <OTPVerification 
          userData={userData}
          onVerifyOTP={handleVerifyOTP}
          onBack={handleBackToLogin}
          onResendOTP={handleResendOTP}
          isLoading={isLoading}
        />
      )}
      
      {currentView === 'dashboard' && currentUser && (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;