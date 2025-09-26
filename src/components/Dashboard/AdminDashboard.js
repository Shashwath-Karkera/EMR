import React, { useState } from 'react';
import './Dashboard.css';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('financial');

  const financialData = [
    { id: 1, category: 'Consultation', amount: '$15,000', trend: '+12%', period: 'This Month' },
    { id: 2, category: 'Lab Tests', amount: '$8,500', trend: '+5%', period: 'This Month' },
    { id: 3, category: 'Pharmacy', amount: '$12,000', trend: '+8%', period: 'This Month' },
    { id: 4, category: 'Emergency', amount: '$25,000', trend: '+15%', period: 'This Month' }
  ];

  const insuranceDetails = [
    { id: 1, provider: 'Blue Cross', plan: 'Gold', coverage: 'Comprehensive', patients: '1,234' },
    { id: 2, provider: 'Aetna', plan: 'Silver', coverage: 'Standard', patients: '890' },
    { id: 3, provider: 'UnitedHealth', plan: 'Platinum', coverage: 'Premium', patients: '567' }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>⚙️ Admin Dashboard</h1>
            <p className="welcome-message">Welcome, {user.username}</p>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-role-badge">Administrator</span>
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
          className={`nav-btn ${activeTab === 'financial' ? 'active' : ''}`}
          onClick={() => setActiveTab('financial')}
        >
          💰 Financial Data
        </button>
        <button 
          className={`nav-btn ${activeTab === 'privacy' ? 'active' : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          🔒 Privacy Policy
        </button>
        <button 
          className={`nav-btn ${activeTab === 'terms' ? 'active' : ''}`}
          onClick={() => setActiveTab('terms')}
        >
          📄 Terms & Conditions
        </button>
        <button 
          className={`nav-btn ${activeTab === 'insurance' ? 'active' : ''}`}
          onClick={() => setActiveTab('insurance')}
        >
          🛡️ Insurance Details
        </button>
      </nav>
      
      <div className="dashboard-content">
        {activeTab === 'financial' && (
          <div className="tab-content">
            <h2>Financial Overview</h2>
            <div className="stats-grid">
              {financialData.map(item => (
                <div key={item.id} className="stat-card financial-card">
                  <h3>{item.category}</h3>
                  <p className="stat-number">{item.amount}</p>
                  <p className="stat-trend positive">{item.trend}</p>
                  <p className="stat-period">{item.period}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="tab-content">
            <h2>Privacy Policy</h2>
            <div className="policy-content">
              <h3>Data Protection</h3>
              <p>We are committed to protecting your personal information and right to privacy.</p>
              
              <h3>Information We Collect</h3>
              <ul>
                <li>Personal identification information</li>
                <li>Medical records and health information</li>
                <li>Payment and insurance details</li>
                <li>Usage data and analytics</li>
              </ul>

              <h3>How We Use Your Information</h3>
              <p>Your information is used solely for medical purposes, treatment, and healthcare operations.</p>
            </div>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="tab-content">
            <h2>Terms and Conditions</h2>
            <div className="policy-content">
              <h3>Acceptance of Terms</h3>
              <p>By using Medicare EMR, you agree to be bound by these terms and conditions.</p>
              
              <h3>Medical Disclaimer</h3>
              <p>This system is for medical professionals only. All data is confidential.</p>
              
              <h3>User Responsibilities</h3>
              <ul>
                <li>Maintain confidentiality of login credentials</li>
                <li>Report any security breaches immediately</li>
                <li>Use the system only for authorized purposes</li>
                <li>Comply with HIPAA regulations</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'insurance' && (
          <div className="tab-content">
            <h2>Insurance Providers</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Plan</th>
                    <th>Coverage</th>
                    <th>Patients</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {insuranceDetails.map(insurance => (
                    <tr key={insurance.id}>
                      <td>{insurance.provider}</td>
                      <td>{insurance.plan}</td>
                      <td>{insurance.coverage}</td>
                      <td>{insurance.patients}</td>
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
      </div>
    </div>
  );
};

export default AdminDashboard;