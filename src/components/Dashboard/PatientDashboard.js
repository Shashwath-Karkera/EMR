import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

const PatientDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('prescriptions');

  const prescriptions = [
    { id: 1, medication: 'Metformin', dosage: '500mg', frequency: 'Twice daily', doctor: 'Dr. Smith', date: '2024-01-10', refills: 3, expiry: '2024-07-10' },
    { id: 2, medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', doctor: 'Dr. Johnson', date: '2024-01-12', refills: 2, expiry: '2024-07-12' },
    { id: 3, medication: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', doctor: 'Dr. Brown', date: '2024-01-15', refills: 5, expiry: '2024-07-15' }
  ];

  const labReports = [
    { id: 1, testName: 'Blood Test', date: '2024-01-10', status: 'Completed', result: 'Normal', lab: 'City Lab Center', urgency: 'Routine' },
    { id: 2, testName: 'X-Ray Chest', date: '2024-01-12', status: 'Completed', result: 'Clear', lab: 'MediScan Imaging', urgency: 'Routine' },
    { id: 3, testName: 'MRI Scan', date: '2024-01-15', status: 'Pending', result: 'Awaiting', lab: 'Advanced Radiology', urgency: 'Urgent' }
  ];

  // New data for additional features
  const doctors = [
    { id: 1, name: 'Dr. Sarah Smith', specialization: 'Cardiology', availability: 'Mon-Fri, 9AM-5PM', rating: 4.8, avatar: '👩‍⚕️', online: true },
    { id: 2, name: 'Dr. Mike Johnson', specialization: 'Neurology', availability: 'Tue-Sat, 10AM-6PM', rating: 4.9, avatar: '👨‍⚕️', online: false },
    { id: 3, name: 'Dr. Emily Brown', specialization: 'General Medicine', availability: 'Mon-Sun, 8AM-4PM', rating: 4.7, avatar: '👩‍⚕️', online: true }
  ];

  const bills = [
    { id: 1, description: 'Consultation Fee', amount: 150, date: '2024-01-10', status: 'Paid', dueDate: '2024-01-20', type: 'Consultation' },
    { id: 2, description: 'Lab Tests Package', amount: 300, date: '2024-01-12', status: 'Pending', dueDate: '2024-01-25', type: 'Laboratory' },
    { id: 3, description: 'MRI Scan Procedure', amount: 500, date: '2024-01-15', status: 'Pending', dueDate: '2024-02-01', type: 'Imaging' }
  ];

  const [message, setMessage] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [visitReason, setVisitReason] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message && selectedDoctor) {
      alert(`Message sent to ${selectedDoctor}!`);
      setMessage('');
    }
  };

  const handleScheduleVisit = (e) => {
    e.preventDefault();
    if (selectedDoctor && visitDate && visitTime && visitReason) {
      alert(`Visit scheduled with ${selectedDoctor} on ${visitDate} at ${visitTime}!`);
      setSelectedDoctor('');
      setVisitDate('');
      setVisitTime('');
      setVisitReason('');
    }
  };

  const handlePayBill = (billId) => {
    alert(`Payment processed for bill #${billId}`);
  };

  const handleRequestRefill = (prescriptionId) => {
    alert(`Refill requested for prescription #${prescriptionId}`);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header bg-gradient-primary">
        <div className="container-fluid">
          <div className="row align-items-center py-3">
            <div className="col-md-6">
              <h1 className="h3 mb-1 fw-bold">👤 Patient Dashboard</h1>
              <p className="mb-0 text-light opacity-90">Welcome back, {user.username}! 👋</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-inline-block me-3">
                <span className="badge bg-light text-primary me-2 fs-6">Patient</span>
                <span className="text-light opacity-90">{user.email}</span>
              </div>
              <button onClick={onLogout} className="btn btn-outline-light btn-sm">
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav bg-white shadow-sm">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="nav-scrollable py-2">
                <button 
                  className={`btn btn-pill me-2 mb-2 ${activeTab === 'prescriptions' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveTab('prescriptions')}
                >
                  💊 Prescriptions
                </button>
                <button 
                  className={`btn btn-pill me-2 mb-2 ${activeTab === 'labReports' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveTab('labReports')}
                >
                  📊 Lab Reports
                </button>
                <button 
                  className={`btn btn-pill me-2 mb-2 ${activeTab === 'communication' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveTab('communication')}
                >
                  💬 Communication
                </button>
                <button 
                  className={`btn btn-pill me-2 mb-2 ${activeTab === 'billing' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveTab('billing')}
                >
                  💳 Billing
                </button>
                <button 
                  className={`btn btn-pill me-2 mb-2 ${activeTab === 'schedule' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveTab('schedule')}
                >
                  📅 Schedule Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="dashboard-content container-fluid py-4">
        
        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <div className="tab-content">
            <div className="row mb-4">
              <div className="col-12">
                <h2 className="fw-bold text-primary mb-3">💊 Your Prescriptions</h2>
                <p className="text-muted">Manage your medications and request refills</p>
              </div>
            </div>
            <div className="row">
              {prescriptions.map(prescription => (
                <div key={prescription.id} className="col-xl-4 col-lg-6 col-md-6 mb-4">
                  <div className="card prescription-card h-100 shadow-hover">
                    <div className="card-header bg-gradient-info text-white d-flex justify-content-between align-items-center">
                      <h5 className="card-title mb-0 fw-bold">{prescription.medication}</h5>
                      <span className="badge bg-light text-dark">{prescription.date}</span>
                    </div>
                    <div className="card-body">
                      <div className="prescription-details">
                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2">💊</span>
                          <div>
                            <small className="text-muted">Dosage</small>
                            <p className="mb-0 fw-semibold">{prescription.dosage}</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2">⏰</span>
                          <div>
                            <small className="text-muted">Frequency</small>
                            <p className="mb-0 fw-semibold">{prescription.frequency}</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2">👨‍⚕️</span>
                          <div>
                            <small className="text-muted">Prescribed by</small>
                            <p className="mb-0 fw-semibold">{prescription.doctor}</p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-6">
                            <small className="text-muted">Refills Left</small>
                            <p className="mb-0 fw-bold text-success">{prescription.refills}</p>
                          </div>
                          <div className="col-6">
                            <small className="text-muted">Expires</small>
                            <p className="mb-0 fw-semibold text-danger">{prescription.expiry}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent">
                      <div className="row g-2">
                        <div className="col-6">
                          <button className="btn btn-primary btn-sm w-100">View Details</button>
                        </div>
                        <div className="col-6">
                          <button 
                            className="btn btn-success btn-sm w-100"
                            onClick={() => handleRequestRefill(prescription.id)}
                          >
                            Request Refill
                          </button>
                        </div>
                        <div className="col-12">
                          <button className="btn btn-outline-secondary btn-sm w-100 mt-1">
                            📄 Download Prescription
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lab Reports Tab */}
        {activeTab === 'labReports' && (
          <div className="tab-content">
            <div className="row mb-4">
              <div className="col-12">
                <h2 className="fw-bold text-primary mb-3">📊 Lab Reports</h2>
                <p className="text-muted">View and manage your laboratory test results</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card shadow-sm">
                  <div className="card-header bg-white">
                    <h5 className="card-title mb-0">Recent Lab Tests</h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover table-striped mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Test Name</th>
                            <th>Date</th>
                            <th>Laboratory</th>
                            <th>Urgency</th>
                            <th>Status</th>
                            <th>Result</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {labReports.map(report => (
                            <tr key={report.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="me-2">🔬</span>
                                  <strong>{report.testName}</strong>
                                </div>
                              </td>
                              <td>{report.date}</td>
                              <td>{report.lab}</td>
                              <td>
                                <span className={`badge ${report.urgency === 'Urgent' ? 'bg-danger' : 'bg-info'}`}>
                                  {report.urgency}
                                </span>
                              </td>
                              <td>
                                <span className={`badge ${report.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                                  {report.status}
                                </span>
                              </td>
                              <td>
                                <span className={`fw-semibold ${report.result === 'Normal' ? 'text-success' : 'text-secondary'}`}>
                                  {report.result}
                                </span>
                              </td>
                              <td>
                                <div className="btn-group btn-group-sm">
                                  <button 
                                    className="btn btn-outline-primary"
                                    disabled={report.status === 'Pending'}
                                  >
                                    👁️ View
                                  </button>
                                  <button 
                                    className="btn btn-outline-success"
                                    disabled={report.status === 'Pending'}
                                  >
                                    📥 Download
                                  </button>
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
          </div>
        )}

        {/* Communication Tab */}
        {activeTab === 'communication' && (
          <div className="tab-content">
            <div className="row mb-4">
              <div className="col-12">
                <h2 className="fw-bold text-primary mb-3">💬 Communication Center</h2>
                <p className="text-muted">Connect with your healthcare providers</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-gradient-success text-white">
                    <h5 className="card-title mb-0">👨‍⚕️ Available Doctors</h5>
                  </div>
                  <div className="card-body">
                    {doctors.map(doctor => (
                      <div 
                        key={doctor.id} 
                        className={`doctor-card border rounded p-3 mb-3 cursor-pointer ${selectedDoctor === doctor.name ? 'selected-doctor' : ''}`}
                        onClick={() => setSelectedDoctor(doctor.name)}
                      >
                        <div className="d-flex align-items-center mb-2">
                          <span className="doctor-avatar me-3 fs-4">{doctor.avatar}</span>
                          <div>
                            <h6 className="mb-0 fw-bold">{doctor.name}</h6>
                            <small className="text-muted">{doctor.specialization}</small>
                          </div>
                          <span className={`status-indicator ms-auto ${doctor.online ? 'online' : 'offline'}`}></span>
                        </div>
                        <div className="doctor-info">
                          <small className="text-muted d-block">📅 {doctor.availability}</small>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <span className="badge bg-warning text-dark">⭐ {doctor.rating}</span>
                            <span className={`badge ${doctor.online ? 'bg-success' : 'bg-secondary'}`}>
                              {doctor.online ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white">
                    <h5 className="card-title mb-0">
                      {selectedDoctor ? `💌 Message to ${selectedDoctor}` : 'Select a doctor to message'}
                    </h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSendMessage}>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Selected Doctor</label>
                        <input 
                          type="text" 
                          className="form-control bg-light" 
                          value={selectedDoctor} 
                          readOnly 
                          placeholder="Choose a doctor from the list"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Your Message</label>
                        <textarea 
                          className="form-control" 
                          rows="6" 
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type your message here... Be specific about your concerns or questions."
                          required
                        ></textarea>
                      </div>
                      <button 
                        type="submit" 
                        className="btn btn-success btn-lg w-100"
                        disabled={!selectedDoctor}
                      >
                        📤 Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="tab-content">
            <div className="row mb-4">
              <div className="col-12">
                <h2 className="fw-bold text-primary mb-3">💳 Billing & Payments</h2>
                <p className="text-muted">View and manage your medical bills</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 mb-4">
                <div className="card shadow-sm">
                  <div className="card-header bg-white">
                    <h5 className="card-title mb-0">Recent Bills</h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bills.map(bill => (
                            <tr key={bill.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="me-2">💰</span>
                                  <strong>{bill.description}</strong>
                                </div>
                              </td>
                              <td>
                                <span className="badge bg-info">{bill.type}</span>
                              </td>
                              <td className="fw-bold text-success">${bill.amount}</td>
                              <td>{bill.date}</td>
                              <td>{bill.dueDate}</td>
                              <td>
                                <span className={`badge ${bill.status === 'Paid' ? 'bg-success' : 'bg-danger'}`}>
                                  {bill.status}
                                </span>
                              </td>
                              <td>
                                <button 
                                  className={`btn btn-sm ${bill.status === 'Paid' ? 'btn-outline-success' : 'btn-danger'}`}
                                  disabled={bill.status === 'Paid'}
                                  onClick={() => handlePayBill(bill.id)}
                                >
                                  {bill.status === 'Paid' ? '✅ Paid' : '💳 Pay Now'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card shadow-sm">
                  <div className="card-header bg-gradient-warning text-dark">
                    <h5 className="card-title mb-0">💰 Billing Summary</h5>
                  </div>
                  <div className="card-body">
                    <div className="billing-summary">
                      <div className="d-flex justify-content-between align-items-center mb-3 p-2 bg-light rounded">
                        <span className="fw-semibold">Total Amount:</span>
                        <strong className="text-primary fs-5">${bills.reduce((sum, bill) => sum + bill.amount, 0)}</strong>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Paid Amount:</span>
                        <strong className="text-success">${bills.filter(bill => bill.status === 'Paid').reduce((sum, bill) => sum + bill.amount, 0)}</strong>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span>Pending Amount:</span>
                        <strong className="text-danger">${bills.filter(bill => bill.status === 'Pending').reduce((sum, bill) => sum + bill.amount, 0)}</strong>
                      </div>
                      <div className="progress mb-3" style={{height: '8px'}}>
                        <div 
                          className="progress-bar bg-success" 
                          style={{width: `${(bills.filter(bill => bill.status === 'Paid').reduce((sum, bill) => sum + bill.amount, 0) / bills.reduce((sum, bill) => sum + bill.amount, 0)) * 100}%`}}
                        ></div>
                      </div>
                      <button className="btn btn-outline-primary w-100 mb-2">
                        📄 Download Statement
                      </button>
                      <button className="btn btn-outline-secondary w-100">
                        🏥 Insurance Claims
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Visit Tab */}
        {activeTab === 'schedule' && (
          <div className="tab-content">
            <div className="row mb-4">
              <div className="col-12">
                <h2 className="fw-bold text-primary mb-3">📅 Schedule a Visit</h2>
                <p className="text-muted">Book your next appointment with ease</p>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card shadow-sm">
                  <div className="card-header bg-gradient-info text-white">
                    <h5 className="card-title mb-0">📋 Appointment Request Form</h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleScheduleVisit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold">👨‍⚕️ Select Doctor</label>
                          <select 
                            className="form-select" 
                            value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                            required
                          >
                            <option value="">Choose a doctor...</option>
                            {doctors.map(doctor => (
                              <option key={doctor.id} value={doctor.name}>
                                {doctor.name} - {doctor.specialization}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold">📅 Preferred Date</label>
                          <input 
                            type="date" 
                            className="form-control" 
                            value={visitDate}
                            onChange={(e) => setVisitDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold">⏰ Preferred Time</label>
                          <input 
                            type="time" 
                            className="form-control" 
                            value={visitTime}
                            onChange={(e) => setVisitTime(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold">🎯 Reason for Visit</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={visitReason}
                            onChange={(e) => setVisitReason(e.target.value)}
                            placeholder="Brief reason for visit"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">📝 Additional Notes</label>
                        <textarea 
                          className="form-control" 
                          rows="3" 
                          placeholder="Any additional information or symptoms you'd like to share..."
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary btn-lg w-100">
                        📅 Schedule Appointment
                      </button>
                    </form>
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

export default PatientDashboard;