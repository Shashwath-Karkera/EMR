import React, { useState } from 'react';
import './Dashboard.css';
import './EmtDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const EMTDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('ambulanceServices');
  const [labReports, setLabReports] = useState([
    { id: 1, patient: 'John Carter', reportType: 'Blood Test', result: 'Normal', ambulanceId: 1, doctor: 'Dr. Adams', time: '11:15 AM' },
    { id: 2, patient: 'Maria Garcia', reportType: 'X-Ray', result: 'Fracture Confirmed', ambulanceId: 2, doctor: 'Dr. Singh', time: '12:00 PM' },
    { id: 3, patient: 'James Wilson', reportType: 'MRI Scan', result: 'Stroke Detected', ambulanceId: 3, doctor: 'Dr. Patel', time: '10:30 AM' }
  ]);

  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [newReport, setNewReport] = useState({
    patient: '',
    reportType: '',
    result: '',
    ambulanceId: '',
    doctor: '',
    time: ''
  });

  const ambulanceServices = [
    { id: 1, patient: 'John Carter', location: '123 Main St', emergency: 'Heart Attack', status: 'Dispatched', time: '10:30 AM' },
    { id: 2, patient: 'Maria Garcia', location: '456 Oak Ave', emergency: 'Fracture', status: 'En Route', time: '11:15 AM' },
    { id: 3, patient: 'James Wilson', location: '789 Pine Rd', emergency: 'Stroke', status: 'Completed', time: '09:45 AM' },
    { id: 4, patient: 'Lisa Thompson', location: '321 Elm St', emergency: 'Respiratory', status: 'Pending', time: '12:00 PM' }
  ];

  const handleDeleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this lab report?')) {
      setLabReports(labReports.filter(report => report.id !== reportId));
    }
  };

  const handleAddReport = () => {
    if (newReport.patient && newReport.reportType && newReport.result) {
      const report = {
        id: Math.max(...labReports.map(r => r.id)) + 1,
        patient: newReport.patient,
        reportType: newReport.reportType,
        result: newReport.result,
        ambulanceId: newReport.ambulanceId || 'N/A',
        doctor: newReport.doctor || 'Dr. Unknown',
        time: newReport.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setLabReports([...labReports, report]);
      setNewReport({
        patient: '',
        reportType: '',
        result: '',
        ambulanceId: '',
        doctor: '',
        time: ''
      });
      setShowAddReportModal(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="dashboard container-fluid">
      <header className="dashboard-header bg-primary text-white p-3 mb-4 rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h3">🚑 EMT Dashboard</h1>
            <p className="mb-0">Welcome, {user.username}</p>
          </div>
          <div className="d-flex align-items-center">
            <div className="me-3 text-end">
              <span className="badge bg-light text-dark me-2">Emergency Medical Technician</span>
              <span>{user.email}</span>
            </div>
            <button onClick={onLogout} className="btn btn-danger btn-sm">
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="mb-4">
        <div className="btn-group">
          <button 
            className={`btn ${activeTab === 'ambulanceServices' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('ambulanceServices')}
          >
            🚑 Ambulance Services
          </button>
          <button 
            className={`btn ${activeTab === 'labReports' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('labReports')}
          >
            🧪 Lab Reports
          </button>
        </div>
      </nav>
      
      <div className="dashboard-content">
        {activeTab === 'ambulanceServices' && (
          <div className="tab-content">
            <h2 className="mb-4">Ambulance Service Requests</h2>

            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Total Requests</h5>
                    <p className="fs-4 fw-bold">{ambulanceServices.length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Pending</h5>
                    <p className="fs-4 fw-bold text-warning">{ambulanceServices.filter(s => s.status === 'Pending').length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">In Progress</h5>
                    <p className="fs-4 fw-bold text-info">{ambulanceServices.filter(s => s.status === 'En Route').length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Completed</h5>
                    <p className="fs-4 fw-bold text-success">{ambulanceServices.filter(s => s.status === 'Completed').length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-responsive shadow-sm">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
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
                        <span className={`badge ${
                          service.status === 'Completed' ? 'bg-success' :
                          service.status === 'Pending' ? 'bg-warning text-dark' :
                          service.status === 'En Route' ? 'bg-info text-dark' :
                          'bg-secondary'
                        }`}>
                          {service.status}
                        </span>
                      </td>
                      <td>{service.time}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-1">Dispatch</button>
                        <button className="btn btn-sm btn-secondary me-1">Details</button>
                        <button className="btn btn-sm btn-warning">Update</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'labReports' && (
          <div className="tab-content">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">Lab Reports</h2>
              <button 
                className="btn btn-success btn-lg"
                onClick={() => setShowAddReportModal(true)}
              >
                <i className="fas fa-plus-circle me-2"></i>
                Add New Report
              </button>
            </div>

            <div className="table-responsive shadow-sm">
              <table className="table table-bordered table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Patient</th>
                    <th>Report Type</th>
                    <th>Result</th>
                    <th>Ambulance ID</th>
                    <th>Doctor</th>
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {labReports.map(report => (
                    <tr key={report.id}>
                      <td className="fw-bold">{report.patient}</td>
                      <td>
                        <span className="badge bg-info text-dark">{report.reportType}</span>
                      </td>
                      <td>
                        <span className={`badge ${
                          report.result.toLowerCase().includes('normal') ? 'bg-success' :
                          report.result.toLowerCase().includes('confirmed') || report.result.toLowerCase().includes('detected') ? 'bg-warning text-dark' :
                          'bg-secondary'
                        }`}>
                          {report.result}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-dark">#{report.ambulanceId}</span>
                      </td>
                      <td className="text-muted">{report.doctor}</td>
                      <td>
                        <small className="text-muted">{report.time}</small>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteReport(report.id)}
                            title="Delete Report"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <button 
                            className="btn btn-outline-primary btn-sm"
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button 
                            className="btn btn-outline-secondary btn-sm"
                            title="Edit Report"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {labReports.length === 0 && (
              <div className="text-center py-5">
                <div className="text-muted">
                  <i className="fas fa-file-medical fa-3x mb-3"></i>
                  <h4>No Lab Reports Available</h4>
                  <p>Click the "Add New Report" button to create your first lab report.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Report Modal */}
      {showAddReportModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-file-medical me-2"></i>
                  Add New Lab Report
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white"
                  onClick={() => setShowAddReportModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="patient" className="form-label">Patient Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="patient"
                      name="patient"
                      value={newReport.patient}
                      onChange={handleInputChange}
                      placeholder="Enter patient name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="reportType" className="form-label">Report Type *</label>
                    <select
                      className="form-select"
                      id="reportType"
                      name="reportType"
                      value={newReport.reportType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select report type</option>
                      <option value="Blood Test">Blood Test</option>
                      <option value="X-Ray">X-Ray</option>
                      <option value="MRI Scan">MRI Scan</option>
                      <option value="CT Scan">CT Scan</option>
                      <option value="Urine Test">Urine Test</option>
                      <option value="ECG">ECG</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="result" className="form-label">Result *</label>
                    <textarea
                      className="form-control"
                      id="result"
                      name="result"
                      value={newReport.result}
                      onChange={handleInputChange}
                      placeholder="Enter test results"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="ambulanceId" className="form-label">Ambulance ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ambulanceId"
                      name="ambulanceId"
                      value={newReport.ambulanceId}
                      onChange={handleInputChange}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="doctor" className="form-label">Doctor</label>
                    <input
                      type="text"
                      className="form-control"
                      id="doctor"
                      name="doctor"
                      value={newReport.doctor}
                      onChange={handleInputChange}
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowAddReportModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-success"
                  onClick={handleAddReport}
                  disabled={!newReport.patient || !newReport.reportType || !newReport.result}
                >
                  <i className="fas fa-save me-2"></i>
                  Save Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMTDashboard;