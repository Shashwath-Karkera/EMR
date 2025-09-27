import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    <div className="dashboard bg-light min-vh-100">
      {/* Header */}
      <header className="dashboard-header bg-white shadow-sm">
        <div className="container-fluid">
          <div className="row align-items-center py-3">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <div className="bg-primary rounded-circle p-2 me-3">
                  <span className="fs-3">⚙️</span>
                </div>
                <div>
                  <h1 className="h3 mb-0 text-primary fw-bold">Admin Dashboard</h1>
                  <p className="text-muted mb-0">Welcome, {user.username}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-end align-items-center">
                <div className="me-3 text-end">
                  <span className="badge bg-primary fs-6">Administrator</span>
                  <div className="text-muted small">{user.email}</div>
                </div>
                <button onClick={onLogout} className="btn btn-outline-danger d-flex align-items-center">
                  <span className="me-2">🚪</span> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav bg-white shadow-sm border-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="nav-scroll">
                <div className="d-flex flex-nowrap py-2">
                  <button 
                    className={`btn btn-lg me-2 d-flex align-items-center ${activeTab === 'financial' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('financial')}
                  >
                    <span className="me-2">💰</span> Financial Data
                  </button>
                  <button 
                    className={`btn btn-lg me-2 d-flex align-items-center ${activeTab === 'privacy' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('privacy')}
                  >
                    <span className="me-2">🔒</span> Privacy Policy
                  </button>
                  <button 
                    className={`btn btn-lg me-2 d-flex align-items-center ${activeTab === 'terms' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('terms')}
                  >
                    <span className="me-2">📄</span> Terms & Conditions
                  </button>
                  <button 
                    className={`btn btn-lg me-2 d-flex align-items-center ${activeTab === 'insurance' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('insurance')}
                  >
                    <span className="me-2">🛡️</span> Insurance Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="dashboard-content container-fluid py-4">
        {/* Financial Tab - Enhanced with Bootstrap */}
        {activeTab === 'financial' && (
          <div className="tab-content">
            <h2 className="text-primary fw-bold mb-4">Financial Overview</h2>
            <div className="row g-4">
              {financialData.map(item => (
                <div key={item.id} className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                  <div className="card shadow-sm border-0 h-100 financial-card">
                    <div className="card-body text-center">
                      <h5 className="card-title text-muted">{item.category}</h5>
                      <h2 className="text-primary fw-bold">{item.amount}</h2>
                      <p className="stat-trend text-success fw-bold">{item.trend}</p>
                      <p className="stat-period text-muted">{item.period}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Privacy Policy Tab - Highly Attractive */}
        {activeTab === 'privacy' && (
          <div className="tab-content">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="card shadow-lg border-0">
                  <div className="card-header bg-primary text-white py-4">
                    <div className="d-flex align-items-center">
                      <span className="display-6 me-3">🔒</span>
                      <div>
                        <h1 className="h2 mb-1">Privacy Policy</h1>
                        <p className="mb-0 opacity-75">Last updated: {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-5">
                    {/* Data Protection Section */}
                    <div className="privacy-section mb-5">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                          <span className="fs-2 text-primary">🛡️</span>
                        </div>
                        <h2 className="text-primary mb-0">Data Protection</h2>
                      </div>
                      <p className="lead text-muted">
                        We are committed to protecting your personal information and right to privacy through 
                        state-of-the-art security measures and compliance with international data protection standards.
                      </p>
                    </div>

                    {/* Information We Collect Section */}
                    <div className="privacy-section mb-5">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-info bg-opacity-10 rounded-circle p-3 me-3">
                          <span className="fs-2 text-info">📊</span>
                        </div>
                        <h2 className="text-info mb-0">Information We Collect</h2>
                      </div>
                      <p className="text-muted mb-4">
                        To provide you with the best possible healthcare experience, we collect the following information:
                      </p>
                      <div className="row g-4">
                        <div className="col-md-6">
                          <div className="d-flex align-items-start">
                            <span className="text-success me-3 fs-5">✓</span>
                            <div>
                              <h5 className="fw-bold">Personal Identification</h5>
                              <p className="text-muted mb-0">Name, contact details, and demographic information</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex align-items-start">
                            <span className="text-success me-3 fs-5">✓</span>
                            <div>
                              <h5 className="fw-bold">Medical Records</h5>
                              <p className="text-muted mb-0">Health history, treatments, and medical reports</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex align-items-start">
                            <span className="text-success me-3 fs-5">✓</span>
                            <div>
                              <h5 className="fw-bold">Payment Information</h5>
                              <p className="text-muted mb-0">Insurance details and billing information</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex align-items-start">
                            <span className="text-success me-3 fs-5">✓</span>
                            <div>
                              <h5 className="fw-bold">Usage Analytics</h5>
                              <p className="text-muted mb-0">System interactions and service usage patterns</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* How We Use Information Section */}
                    <div className="privacy-section">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                          <span className="fs-2 text-success">🔍</span>
                        </div>
                        <h2 className="text-success mb-0">How We Use Your Information</h2>
                      </div>
                      <p className="lead text-muted">
                        Your information is used exclusively for medical purposes, treatment planning, healthcare operations, 
                        and improving patient care quality in full compliance with HIPAA regulations and medical ethics.
                      </p>
                      <div className="bg-light rounded p-4 mt-4">
                        <h5 className="fw-bold text-primary">🔐 Security Guarantee</h5>
                        <p className="mb-0">
                          All data is encrypted using AES-256 encryption and stored in secure, HIPAA-compliant servers 
                          with regular security audits and monitoring.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Terms & Conditions Tab - Highly Attractive */}
        {activeTab === 'terms' && (
          <div className="tab-content">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="card shadow-lg border-0">
                  <div className="card-header bg-success text-white py-4">
                    <div className="d-flex align-items-center">
                      <span className="display-6 me-3">📄</span>
                      <div>
                        <h1 className="h2 mb-1">Terms & Conditions</h1>
                        <p className="mb-0 opacity-75">Effective date: {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-5">
                    {/* Acceptance Section */}
                    <div className="terms-section mb-5">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                          <span className="fs-2 text-success">✅</span>
                        </div>
                        <h2 className="text-success mb-0">Acceptance of Terms</h2>
                      </div>
                      <p className="lead text-muted">
                        By accessing and using Medicare EMR, you acknowledge that you have read, understood, 
                        and agree to be bound by these comprehensive terms and conditions designed to ensure 
                        the highest standards of patient care and data security.
                      </p>
                    </div>

                    {/* Medical Disclaimer Section */}
                    <div className="terms-section mb-5">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-warning bg-opacity-10 rounded-circle p-3 me-3">
                          <span className="fs-2 text-warning">⚕️</span>
                        </div>
                        <h2 className="text-warning mb-0">Medical Disclaimer</h2>
                      </div>
                      <p className="text-muted">
                        This electronic medical records system is strictly intended for use by qualified medical 
                        professionals. All patient data contained within is highly confidential and must be handled 
                        in accordance with medical ethics, legal requirements, and professional standards.
                      </p>
                    </div>

                    {/* User Responsibilities Section */}
                    <div className="terms-section">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-info bg-opacity-10 rounded-circle p-3 me-3">
                          <span className="fs-2 text-info">👥</span>
                        </div>
                        <h2 className="text-info mb-0">User Responsibilities</h2>
                      </div>
                      <div className="row g-4">
                        <div className="col-md-6 col-lg-4">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center">
                              <span className="fs-1 text-primary">🔑</span>
                              <h6 className="fw-bold mt-2">Credential Security</h6>
                              <p className="small text-muted">Maintain strict confidentiality of all login credentials</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center">
                              <span className="fs-1 text-danger">🚨</span>
                              <h6 className="fw-bold mt-2">Breach Reporting</h6>
                              <p className="small text-muted">Immediately report any security incidents or breaches</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center">
                              <span className="fs-1 text-warning">🎯</span>
                              <h6 className="fw-bold mt-2">Authorized Use</h6>
                              <p className="small text-muted">Use system only for authorized medical purposes</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center">
                              <span className="fs-1 text-success">📋</span>
                              <h6 className="fw-bold mt-2">HIPAA Compliance</h6>
                              <p className="small text-muted">Strictly adhere to all HIPAA regulations</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center">
                              <span className="fs-1 text-info">📝</span>
                              <h6 className="fw-bold mt-2">Data Accuracy</h6>
                              <p className="small text-muted">Ensure all medical records are accurate and complete</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center">
                              <span className="fs-1 text-primary">👨‍⚕️</span>
                              <h6 className="fw-bold mt-2">Professional Ethics</h6>
                              <p className="small text-muted">Maintain highest standards of medical ethics</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insurance Details Tab - Highly Responsive */}
        {activeTab === 'insurance' && (
          <div className="tab-content">
            <h2 className="text-primary fw-bold mb-4">Insurance Providers</h2>
            
            {/* Mobile Cards View */}
            <div className="d-block d-lg-none">
              <div className="row g-3">
                {insuranceDetails.map(insurance => (
                  <div key={insurance.id} className="col-12">
                    <div className="card shadow-sm border-0">
                      <div className="card-header bg-light">
                        <h5 className="mb-0 text-primary">{insurance.provider}</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <small className="text-muted">Plan</small>
                            <p className="fw-bold">{insurance.plan}</p>
                          </div>
                          <div className="col-6">
                            <small className="text-muted">Coverage</small>
                            <p className="fw-bold">{insurance.coverage}</p>
                          </div>
                          <div className="col-6">
                            <small className="text-muted">Patients</small>
                            <p className="fw-bold text-primary">{insurance.patients}</p>
                          </div>
                          <div className="col-6">
                            <small className="text-muted">Actions</small>
                            <div>
                              <button className="btn btn-sm btn-outline-primary me-1">View</button>
                              <button className="btn btn-sm btn-outline-success">Edit</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="d-none d-lg-block">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-light">
                  <h5 className="mb-0">Provider Management</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
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
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="fs-5 me-2">🏥</span>
                                <strong>{insurance.provider}</strong>
                              </div>
                            </td>
                            <td>
                              <span className={`badge ${
                                insurance.plan === 'Gold' ? 'bg-warning' : 
                                insurance.plan === 'Platinum' ? 'bg-info' : 'bg-secondary'
                              }`}>
                                {insurance.plan}
                              </span>
                            </td>
                            <td>{insurance.coverage}</td>
                            <td>
                              <span className="text-primary fw-bold">{insurance.patients}</span>
                            </td>
                            <td>
                              <div className="btn-group">
                                <button className="btn btn-sm btn-outline-primary">View</button>
                                <button className="btn btn-sm btn-outline-success">Edit</button>
                                <button className="btn btn-sm btn-outline-info">Details</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;