import React, { useState } from 'react';
import './Dashboard.css';

const DoctorDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('patientRecords');

  // Sample data
  const patientRecords = [
    { id: 1, name: 'John Doe', age: 45, condition: 'Hypertension', lastVisit: '2024-01-15', status: 'Stable' },
    { id: 2, name: 'Jane Smith', age: 32, condition: 'Diabetes', lastVisit: '2024-01-14', status: 'Critical' },
    { id: 3, name: 'Mike Johnson', age: 58, condition: 'Arthritis', lastVisit: '2024-01-13', status: 'Stable' },
    { id: 4, name: 'Sarah Wilson', age: 29, condition: 'Asthma', lastVisit: '2024-01-12', status: 'Improving' }
  ];

  const emergencyCases = [
    { id: 1, patient: 'Robert Brown', condition: 'Heart Attack', priority: 'High', time: '10:30 AM', status: 'Pending' },
    { id: 2, patient: 'Emily Davis', condition: 'Fracture', priority: 'Medium', time: '11:15 AM', status: 'In Progress' },
    { id: 3, patient: 'David Lee', condition: 'Stroke', priority: 'High', time: '09:45 AM', status: 'Completed' }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>👨‍⚕️ Doctor Dashboard</h1>
            <p className="welcome-message">Welcome, Dr. {user.username}</p>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-role-badge">Doctor</span>
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
          className={`nav-btn ${activeTab === 'patientRecords' ? 'active' : ''}`}
          onClick={() => setActiveTab('patientRecords')}
        >
          📋 Patient Records
        </button>
        <button 
          className={`nav-btn ${activeTab === 'emergencyCases' ? 'active' : ''}`}
          onClick={() => setActiveTab('emergencyCases')}
        >
          🚨 Emergency Cases
        </button>
      </nav>
      
      <div className="dashboard-content">
        {activeTab === 'patientRecords' && (
          <div className="tab-content">
            <h2>Patient Records</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Condition</th>
                    <th>Last Visit</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patientRecords.map(record => (
                    <tr key={record.id}>
                      <td>{record.id}</td>
                      <td>{record.name}</td>
                      <td>{record.age}</td>
                      <td>{record.condition}</td>
                      <td>{record.lastVisit}</td>
                      <td>
                        <span className={`status-badge ${record.status.toLowerCase()}`}>
                          {record.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-sm primary">View</button>
                        <button className="btn-sm secondary">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'emergencyCases' && (
          <div className="tab-content">
            <h2>Emergency Cases</h2>
            <div className="cards-grid">
              {emergencyCases.map(caseItem => (
                <div key={caseItem.id} className="card emergency-card">
                  <div className="card-header">
                    <h3>{caseItem.patient}</h3>
                    <span className={`priority-badge ${caseItem.priority.toLowerCase()}`}>
                      {caseItem.priority}
                    </span>
                  </div>
                  <div className="card-body">
                    <p><strong>Condition:</strong> {caseItem.condition}</p>
                    <p><strong>Time:</strong> {caseItem.time}</p>
                    <p><strong>Status:</strong> 
                      <span className={`status-badge ${caseItem.status.toLowerCase().replace(' ', '-')}`}>
                        {caseItem.status}
                      </span>
                    </p>
                  </div>
                  <div className="card-footer">
                    <button className="btn primary">Take Action</button>
                    <button className="btn secondary">Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;