import React, { useState } from 'react';
import './Dashboard.css';
import './ReceptionistDashboard.css';

const ReceptionistDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: 'Appointment reminder: John Doe at 10:00 AM', time: '5 min ago', read: false },
    { id: 2, type: 'info', message: 'New patient registration pending', time: '15 min ago', read: false },
    { id: 3, type: 'success', message: 'Payment received from Jane Smith', time: '1 hour ago', read: true },
    { id: 4, type: 'danger', message: 'Urgent: Dr. Wilson running 30 mins late', time: '2 hours ago', read: false }
  ]);

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

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="dashboard">
      {/* Bootstrap CSS */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        rel="stylesheet" 
      />

      <header className="dashboard-header bg-primary text-white">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center">
              <h1 className="h3 mb-0 me-4">📋 Receptionist Dashboard</h1>
              <p className="welcome-message mb-0">Welcome, {user.username}</p>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              {/* Notifications Bell - Properly aligned */}
              <div className="position-relative">
                <button 
                  className="btn btn-light btn-sm position-relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                  type="button"
                >
                  <i className="fas fa-bell"></i>
                  {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="position-absolute end-0 mt-2" style={{zIndex: 1000, width: '350px'}}>
                    <div className="card shadow-lg border-0">
                      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <strong>Notifications ({unreadCount} unread)</strong>
                        <button 
                          className="btn btn-sm btn-light"
                          onClick={markAllAsRead}
                        >
                          Mark all read
                        </button>
                      </div>
                      <div className="card-body p-0" style={{maxHeight: '400px', overflowY: 'auto'}}>
                        {notifications.length === 0 ? (
                          <div className="text-center py-4 text-muted">
                            <i className="fas fa-bell-slash fa-2x mb-2"></i>
                            <p className="mb-0">No notifications</p>
                          </div>
                        ) : (
                          notifications.map(notification => (
                            <div 
                              key={notification.id} 
                              className={`border-bottom p-3 ${!notification.read ? 'bg-light' : ''}`}
                            >
                              <div className="d-flex align-items-start">
                                <div className="flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-center mb-1">
                                    <span className={`badge bg-${notification.type}`}>
                                      {notification.type}
                                    </span>
                                    <small className="text-muted">{notification.time}</small>
                                  </div>
                                  <p className="mb-1 small">{notification.message}</p>
                                </div>
                                <div className="d-flex flex-column gap-1 ms-2">
                                  {!notification.read && (
                                    <button 
                                      className="btn btn-sm btn-outline-success"
                                      onClick={() => markAsRead(notification.id)}
                                      title="Mark as read"
                                    >
                                      <i className="fas fa-check"></i>
                                    </button>
                                  )}
                                  <button 
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => deleteNotification(notification.id)}
                                    title="Delete"
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User info and logout - Properly aligned */}
              <div className="d-flex align-items-center gap-3">
                <div className="text-end">
                  <span className="badge bg-light text-dark d-block">Receptionist</span>
                  <small className="text-white-50">{user.email}</small>
                </div>
                <button onClick={onLogout} className="btn btn-danger btn-sm">
                  <i className="fas fa-sign-out-alt me-1"></i>Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards Row */}
      <div className="container-fluid mt-4">
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card text-center bg-primary text-white shadow-sm">
              <div className="card-body">
                <i className="fas fa-calendar-check fa-2x mb-2"></i>
                <h5 className="card-title">Today's Appointments</h5>
                <p className="fs-4 fw-bold mb-0">12</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center bg-success text-white shadow-sm">
              <div className="card-body">
                <i className="fas fa-dollar-sign fa-2x mb-2"></i>
                <h5 className="card-title">Pending Payments</h5>
                <p className="fs-4 fw-bold mb-0">$2,450</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center bg-warning text-dark shadow-sm">
              <div className="card-body">
                <i className="fas fa-user-clock fa-2x mb-2"></i>
                <h5 className="card-title">Waiting Patients</h5>
                <p className="fs-4 fw-bold mb-0">5</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center bg-info text-white shadow-sm">
              <div className="card-body">
                <i className="fas fa-users fa-2x mb-2"></i>
                <h5 className="card-title">New Patients</h5>
                <p className="fs-4 fw-bold mb-0">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="dashboard-nav container-fluid">
        <div className="btn-group" role="group">
          <button 
            className={`btn btn-lg ${activeTab === 'appointments' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('appointments')}
          >
            <i className="fas fa-calendar-alt me-2"></i>
            Schedule Appointment
          </button>
          <button 
            className={`btn btn-lg ${activeTab === 'billing' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('billing')}
          >
            <i className="fas fa-file-invoice-dollar me-2"></i>
            Billing and Payment
          </button>
        </div>
      </nav>
      
      <div className="dashboard-content container-fluid mt-4">
        {activeTab === 'appointments' && (
          <div className="tab-content">
            <div className="section-header d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3">Appointment Scheduling</h2>
              <button className="btn btn-primary btn-lg">
                <i className="fas fa-plus me-2"></i>New Appointment
              </button>
            </div>
            
            <div className="table-responsive shadow-sm">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
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
                      <td className="fw-bold">{appointment.patient}</td>
                      <td>{appointment.doctor}</td>
                      <td>{appointment.date}</td>
                      <td>
                        <span className="badge bg-light text-dark">{appointment.time}</span>
                      </td>
                      <td>
                        <span className={`badge ${
                          appointment.status === 'Confirmed' ? 'bg-success' :
                          appointment.status === 'Scheduled' ? 'bg-info' :
                          appointment.status === 'Pending' ? 'bg-warning' :
                          'bg-secondary'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="fas fa-edit me-1"></i>Edit
                          </button>
                          <button className="btn btn-sm btn-outline-success">
                            <i className="fas fa-check me-1"></i>Confirm
                          </button>
                          <button className="btn btn-sm btn-outline-warning">
                            <i className="fas fa-times me-1"></i>Cancel
                          </button>
                        </div>
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
            <div className="section-header d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3">Billing and Payments</h2>
              <button className="btn btn-primary btn-lg">
                <i className="fas fa-plus me-2"></i>New Invoice
              </button>
            </div>
            
            <div className="table-responsive shadow-sm">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
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
                      <td className="fw-bold">{bill.patient}</td>
                      <td>{bill.service}</td>
                      <td className="fw-bold text-success">{bill.amount}</td>
                      <td>
                        <span className={`badge ${
                          bill.status === 'Paid' ? 'bg-success' :
                          bill.status === 'Pending' ? 'bg-warning' :
                          bill.status === 'Overdue' ? 'bg-danger' :
                          'bg-secondary'
                        }`}>
                          {bill.status}
                        </span>
                      </td>
                      <td>{bill.date}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="fas fa-eye me-1"></i>View
                          </button>
                          <button className="btn btn-sm btn-outline-info">
                            <i className="fas fa-print me-1"></i>Print
                          </button>
                          <button className="btn btn-sm btn-outline-warning">
                            <i className="fas fa-edit me-1"></i>Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default ReceptionistDashboard;