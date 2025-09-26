import React from 'react';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import EMTDashboard from './EMTDashboard';
import ReceptionistDashboard from './ReceptionistDashboard';
import AdminDashboard from './AdminDashboard';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const renderDashboard = () => {
    switch (user.userType) {
      case 'Doctor':
        return <DoctorDashboard user={user} onLogout={onLogout} />;
      case 'Patient':
        return <PatientDashboard user={user} onLogout={onLogout} />;
      case 'EMT':
        return <EMTDashboard user={user} onLogout={onLogout} />;
      case 'Receptionist':
        return <ReceptionistDashboard user={user} onLogout={onLogout} />;
      case 'Admin':
        return <AdminDashboard user={user} onLogout={onLogout} />;
      default:
        return <div>Unknown user type</div>;
    }
  };

  return (
    <div className="dashboard-container">
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;