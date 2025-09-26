import React, { useState } from 'react';
import './Dashboard.css';

const EMTDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('ambulanceServices');

  const ambulanceServices = [
    { id: 1, patient: 'John Carter', location: '123 Main St', emergency: 'Heart Attack', status: 'Dispatched', time: '10:30 AM' },
    { id: 2, patient: 'Maria Garcia', location: '456 Oak Ave', emergency: 'Fracture', status: 'En Route', time: '11:15 AM' },
    { id: 3, patient: 'James Wilson', location: '789 Pine Rd', emergency: 'Stroke', status: 'Completed', time: '09:45 AM' },
    { id: 4, patient: 'Lisa Thompson', location: '321 Elm St', emergency: 'Respiratory', status: 'Pending', time: '12:00 PM' }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>🚑 EMT Dashboard</h1>
            <p className="welcome-message">Welcome, {user.username}</p>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-role-badge">Emergency Medical Technician</span>
              <span className="user-email">{user.email}</span>
            </div>
            <button onClick={onLogout} className="logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={`nav-btn ${activeTab === 'ambulanceServices' ? 'active' : ''}`}
          onClick={() => setActiveTab('ambulanceServices')}
        >
          🚑 Ambulance Services
        </button>
      </nav>
      
      <div className="dashboard-content">
        <div className="tab-content">
          <h2>Ambulance Service Requests</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Requests</h3>
              <p className="stat-number">{ambulanceServices.length}</p>
            </div>
            <div className="stat-card">
              <h3>Pending</h3>
              <p className="stat-number">{ambulanceServices.filter(s => s.status === 'Pending').length}</p>
            </div>
            <div className="stat-card">
              <h3>In Progress</h3>
              <p className="stat-number">{ambulanceServices.filter(s => s.status === 'En Route').length}</p>
            </div>
            <div className="stat-card">
              <h3>Completed</h3>
              <p className="stat-number">{ambulanceServices.filter(s => s.status === 'Completed').length}</p>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Location</th>
                  <th>Emergency</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ambulanceServices.map(service => (
                  <tr key={service.id}>
                    <td>{service.patient}</td>
                    <td>{service.location}</td>
                    <td>{service.emergency}</td>
                    <td>
                      <span className={`status-badge ${service.status.toLowerCase().replace(' ', '-')}`}>
                        {service.status}
                      </span>
                    </td>
                    <td>{service.time}</td>
                    <td>
                      <button className="btn-sm primary">Dispatch</button>
                      <button className="btn-sm secondary">Details</button>
                      <button className="btn-sm warning">Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMTDashboard;