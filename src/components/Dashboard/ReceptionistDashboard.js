import React, { useState } from 'react';
import './Dashboard.css';

const ReceptionistDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('appointments');

  const appointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', date: '2024-01-20', time: '10:00 AM', status: 'Scheduled' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Johnson', date: '2024-01-20', time: '11:30 AM', status: 'Confirmed' },
    { id: 3, patient: 'Mike Brown', doctor: 'Dr. Wilson', date: '2024-01-21', time: '02:15 PM', status: 'Pending' }
  ];

  const billingRecords = [
    { id: 1, patient: 'John Doe', service: 'Consultation', amount: '$150', status: 'Paid', date: '2024-01-15' },
    { id: 2, patient: 'Jane Smith', service: 'Lab Tests', amount: '$200', status: 'Pending', date: '2024-01-16' },
    { id: 3, patient: 'Mike Brown', service: 'X-Ray', amount: '$120', status: 'Overdue', date: '2024-01-10' }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>📋 Receptionist Dashboard</h1>
            <p className="welcome-message">Welcome, {user.username}</p>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-role-badge">Receptionist</span>
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
          className={`nav-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          📅 Schedule Appointment
        </button>
        <button 
          className={`nav-btn ${activeTab === 'billing' ? 'active' : ''}`}
          onClick={() => setActiveTab('billing')}
        >
          💰 Billing and Payment
        </button>
      </nav>
      
      <div className="dashboard-content">
        {activeTab === 'appointments' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Appointment Scheduling</h2>
              <button className="btn primary">+ New Appointment</button>
            </div>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(appointment => (
                    <tr key={appointment.id}>
                      <td>{appointment.patient}</td>
                      <td>{appointment.doctor}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>
                        <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-sm primary">Edit</button>
                        <button className="btn-sm secondary">Confirm</button>
                        <button className="btn-sm warning">Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Billing and Payments</h2>
              <button className="btn primary">+ New Invoice</button>
            </div>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Service</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {billingRecords.map(bill => (
                    <tr key={bill.id}>
                      <td>{bill.patient}</td>
                      <td>{bill.service}</td>
                      <td>{bill.amount}</td>
                      <td>
                        <span className={`status-badge ${bill.status.toLowerCase()}`}>
                          {bill.status}
                        </span>
                      </td>
                      <td>{bill.date}</td>
                      <td>
                        <button className="btn-sm primary">View</button>
                        <button className="btn-sm secondary">Print</button>
                        <button className="btn-sm warning">Update</button>
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

export default ReceptionistDashboard;