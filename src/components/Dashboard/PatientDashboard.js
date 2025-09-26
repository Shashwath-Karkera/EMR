import React, { useState } from 'react';
import './Dashboard.css';

const PatientDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('prescriptions');

  const prescriptions = [
    { id: 1, medication: 'Metformin', dosage: '500mg', frequency: 'Twice daily', doctor: 'Dr. Smith', date: '2024-01-10' },
    { id: 2, medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', doctor: 'Dr. Johnson', date: '2024-01-12' },
    { id: 3, medication: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', doctor: 'Dr. Brown', date: '2024-01-15' }
  ];

  const labReports = [
    { id: 1, testName: 'Blood Test', date: '2024-01-10', status: 'Completed', result: 'Normal' },
    { id: 2, testName: 'X-Ray Chest', date: '2024-01-12', status: 'Completed', result: 'Clear' },
    { id: 3, testName: 'MRI Scan', date: '2024-01-15', status: 'Pending', result: 'Awaiting' }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>👤 Patient Dashboard</h1>
            <p className="welcome-message">Welcome, {user.username}</p>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-role-badge">Patient</span>
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
          className={`nav-btn ${activeTab === 'prescriptions' ? 'active' : ''}`}
          onClick={() => setActiveTab('prescriptions')}
        >
          💊 Prescriptions
        </button>
        <button 
          className={`nav-btn ${activeTab === 'labReports' ? 'active' : ''}`}
          onClick={() => setActiveTab('labReports')}
        >
          📊 Lab Reports
        </button>
      </nav>
      
      <div className="dashboard-content">
        {activeTab === 'prescriptions' && (
          <div className="tab-content">
            <h2>Your Prescriptions</h2>
            <div className="cards-grid">
              {prescriptions.map(prescription => (
                <div key={prescription.id} className="card prescription-card">
                  <div className="card-header">
                    <h3>{prescription.medication}</h3>
                    <span className="date-badge">{prescription.date}</span>
                  </div>
                  <div className="card-body">
                    <p><strong>Dosage:</strong> {prescription.dosage}</p>
                    <p><strong>Frequency:</strong> {prescription.frequency}</p>
                    <p><strong>Prescribed by:</strong> {prescription.doctor}</p>
                  </div>
                  <div className="card-footer">
                    <button className="btn primary">View Details</button>
                    <button className="btn secondary">Download</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'labReports' && (
          <div className="tab-content">
            <h2>Lab Reports</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Test Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Result</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {labReports.map(report => (
                    <tr key={report.id}>
                      <td>{report.testName}</td>
                      <td>{report.date}</td>
                      <td>
                        <span className={`status-badge ${report.status.toLowerCase()}`}>
                          {report.status}
                        </span>
                      </td>
                      <td>{report.result}</td>
                      <td>
                        <button className="btn-sm primary" disabled={report.status === 'Pending'}>
                          View
                        </button>
                        <button className="btn-sm secondary" disabled={report.status === 'Pending'}>
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;