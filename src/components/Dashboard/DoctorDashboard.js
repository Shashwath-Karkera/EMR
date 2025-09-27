import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('patient-records');
  const [notifications, setNotifications] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [doctorProfile, setDoctorProfile] = useState({});
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState('');

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== 'undefined';
  };

  // Connect to MetaMask
  const connectMetaMask = async () => {
    if (!isMetaMaskInstalled()) {
      setConnectionError('MetaMask is not installed. Please install it to continue.');
      return;
    }

    try {
      setConnectionError('');
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        // Add notification for successful connection
        setNotifications(prev => [...prev, {
          id: prev.length + 1,
          title: 'MetaMask Connected',
          message: `Successfully connected to wallet: ${accounts[0].substring(0, 8)}...`,
          time: new Date().toLocaleTimeString(),
          read: false
        }]);
      }
    } catch (error) {
      console.error('Failed to connect to MetaMask:', error);
      setConnectionError('Failed to connect to MetaMask. Please make sure MetaMask is unlocked.');
    }
  };

  // Disconnect MetaMask
  const disconnectMetaMask = () => {
    setWalletAddress('');
    setIsConnected(false);
    setNotifications(prev => [...prev, {
      id: prev.length + 1,
      title: 'MetaMask Disconnected',
      message: 'Wallet connection has been disconnected',
      time: new Date().toLocaleTimeString(),
      read: false
    }]);
  };

  // Sample data
  useEffect(() => {
    // Mock data initialization
    setDoctorProfile({
      name: "Divan",
      email: "divan@gmail.com",
      specialization: "Cardiology",
      phone: "+91 9008816429",
      address: "123 Medical Center, Health City",
      experience: "15 years",
      education: "MD, Harvard Medical School"
    });

    setNotifications([
      { id: 1, title: 'New Lab Results', message: 'Lab results for John Doe are available', time: '10:30 AM', read: false },
      { id: 2, title: 'Appointment Reminder', message: 'You have an appointment with Sarah Wilson at 2:00 PM', time: '9:15 AM', read: true },
      { id: 3, title: 'System Update', message: 'Medical records system will be updated tonight', time: 'Yesterday', read: true }
    ]);

    setReminders([
      { id: 1, title: 'Follow-up with Jane Smith', date: '2024-01-20', priority: 'high' },
      { id: 2, title: 'Review Mike Johnson MRI', date: '2024-01-18', priority: 'medium' },
      { id: 3, title: 'Staff Meeting', date: '2024-01-22', priority: 'low' }
    ]);

    setMessages([
      { id: 1, patient: 'John Doe', message: 'Hello Doctor, I have been experiencing headaches', time: '2024-01-15 09:30', unread: true },
      { id: 2, patient: 'Sarah Wilson', message: 'Thank you for the prescription', time: '2024-01-14 14:20', unread: false },
      { id: 3, patient: 'Mike Johnson', message: 'When should I schedule my next appointment?', time: '2024-01-14 11:15', unread: true }
    ]);

    // Check if already connected
    if (isMetaMaskInstalled() && window.ethereum.selectedAddress) {
      setWalletAddress(window.ethereum.selectedAddress);
      setIsConnected(true);
    }
  }, []);

  const patients = [
    { id: 1, name: 'John Doe', age: 45, condition: 'Hypertension', lastVisit: '2024-01-15', status: 'Stable', contact: 'john.doe@email.com', phone: '555-0101' },
    { id: 2, name: 'Jane Smith', age: 32, condition: 'Diabetes', lastVisit: '2024-01-14', status: 'Critical', contact: 'jane.smith@email.com', phone: '555-0102' },
    { id: 3, name: 'Mike Johnson', age: 58, condition: 'Arthritis', lastVisit: '2024-01-13', status: 'Stable', contact: 'mike.johnson@email.com', phone: '555-0103' },
    { id: 4, name: 'Sarah Wilson', age: 29, condition: 'Asthma', lastVisit: '2024-01-12', status: 'Improving', contact: 'sarah.wilson@email.com', phone: '555-0104' },
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Stable': 'bg-success',
      'Critical': 'bg-danger',
      'Improving': 'bg-info'
    };
    
    return (
      <span className={`badge ${statusClasses[status] || 'bg-secondary'}`}>
        {status}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      'high': 'bg-danger',
      'medium': 'bg-warning',
      'low': 'bg-info'
    };
    
    return (
      <span className={`badge ${priorityClasses[priority] || 'bg-secondary'}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    ));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const sendMessage = () => {
    if (newMessage.trim() === '' || !selectedPatient) return;
    
    const newMsg = {
      id: messages.length + 1,
      patient: selectedPatient.name,
      message: newMessage,
      time: new Date().toLocaleString(),
      unread: false,
      sentBy: 'doctor'
    };
    
    setMessages([newMsg, ...messages]);
    setNewMessage('');
  };

  const markMessageAsRead = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? {...msg, unread: false} : msg
    ));
  };

  // Add custom CSS for purple-blue theme
  const customStyles = `
    .bg-primary { background-color: #6f42c1 !important; }
    .btn-primary { background-color: #6f42c1; border-color: #6f42c1; }
    .btn-primary:hover { background-color: #5a32a3; border-color: #5a32a3; }
    .btn-outline-primary { color: #6f42c1; border-color: #6f42c1; }
    .btn-outline-primary:hover { background-color: #6f42c1; border-color: #6f42c1; }
    .text-primary { color: #6f42c1 !important; }
    .border-primary { border-color: #6f42c1 !important; }
    .nav-pills .nav-link.active { background-color: #6f42c1; }
    .list-group-item.active { background-color: #6f42c1; border-color: #6f42c1; }
    .badge.bg-primary { background-color: #6f42c1 !important; }
    
    /* Gradient background for header */
    .dashboard-header {
      background: linear-gradient(135deg, #6f42c1 0%, #007bff 100%) !important;
    }
    
    /* Custom navbar styling */
    .nav-tabs .nav-link.active {
      background-color: #6f42c1;
      color: white;
      border-color: #6f42c1;
    }
    
    .nav-tabs .nav-link {
      color: #f9ebebff;
    }
    
    /* Wallet connection status */
    .wallet-connected {
      background-color: #28a745;
      color: white;
    }
    
    .wallet-disconnected {
      background-color: #dc3545;
      color: white;
    }
  `;

  return (
    <div className="container-fluid">
      <style>{customStyles}</style>
      
      {/* Header */}
      <header className="dashboard-header text-white p-3 mb-4 shadow">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h1 className="h4 mb-0">Doctor Dashboard</h1>
            <p className="mb-0">Welcome, Dr. {doctorProfile.name}</p>
            <small>{doctorProfile.specialization} | {doctorProfile.email}</small>
          </div>
          <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
            {isConnected ? (
              <div className="d-flex align-items-center gap-2">
                <span className="badge wallet-connected">
                  <i className="bi bi-wallet2 me-1"></i>
                  Connected: {walletAddress.substring(0, 8)}...
                </span>
                <button className="btn btn-outline-light btn-sm" onClick={disconnectMetaMask}>
                  Disconnect
                </button>
              </div>
            ) : (
              <button className="btn btn-outline-light btn-sm" onClick={connectMetaMask}>
                <i className="bi bi-wallet2 me-1"></i> Connect MetaMask
              </button>
            )}
            <button className="btn btn-outline-light btn-sm">
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        </div>
        
        {/* Horizontal Navigation */}
        <nav className="mt-3">
          <ul className="nav nav-tabs" id="dashboardTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'patient-records' ? 'active' : ''}`}
                onClick={() => setActiveTab('patient-records')}
              >
                <i className="bi bi-people-fill me-1"></i> Patient Records
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'emergency-cases' ? 'active' : ''}`}
                onClick={() => setActiveTab('emergency-cases')}
              >
                <i className="bi bi-exclamation-triangle-fill me-1"></i> Emergency Cases
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'communication' ? 'active' : ''}`}
                onClick={() => setActiveTab('communication')}
              >
                <i className="bi bi-chat-dots-fill me-1"></i> Communication
                {messages.filter(m => m.unread).length > 0 && (
                  <span className="badge bg-danger ms-1">
                    {messages.filter(m => m.unread).length}
                  </span>
                )}
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <i className="bi bi-person-fill me-1"></i> Profile
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <i className="bi bi-bell-fill me-1"></i> Notifications
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="badge bg-danger ms-1">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'reminders' ? 'active' : ''}`}
                onClick={() => setActiveTab('reminders')}
              >
                <i className="bi bi-clock-fill me-1"></i> Reminders
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Connection Error Alert */}
      {connectionError && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>MetaMask Error:</strong> {connectionError}
          <button type="button" className="btn-close" onClick={() => setConnectionError('')}></button>
        </div>
      )}

      {/* Main Content */}
      <div className="tab-content" id="dashboardTabContent">
        {/* Patient Records Tab */}
        <div className={`tab-pane fade ${activeTab === 'patient-records' ? 'show active' : ''}`}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">Patient Records</h2>
            <button className="btn btn-primary btn-sm">
              <i className="bi bi-plus-circle"></i> Add New Patient
            </button>
          </div>
          
          {/* Responsive table */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
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
                {patients.map(patient => (
                  <tr key={patient.id}>
                    <td>#{patient.id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.condition}</td>
                    <td>{patient.lastVisit}</td>
                    <td>{getStatusBadge(patient.status)}</td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <button className="btn btn-outline-primary">
                          <i className="bi bi-eye"></i> View
                        </button>
                        <button className="btn btn-outline-secondary">
                          <i className="bi bi-pencil"></i> Edit
                        </button>
                        <button 
                          className="btn btn-outline-info"
                          onClick={() => {
                            setSelectedPatient(patient);
                            setActiveTab('communication');
                          }}
                        >
                          <i className="bi bi-chat"></i> Message
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile cards view */}
          <div className="d-lg-none">
            {patients.map(patient => (
              <div key={patient.id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">#{patient.id} {patient.name}</h5>
                  <p className="card-text">
                    <strong>Age:</strong> {patient.age}<br />
                    <strong>Condition:</strong> {patient.condition}<br />
                    <strong>Last Visit:</strong> {patient.lastVisit}<br />
                    <strong>Status:</strong> {getStatusBadge(patient.status)}
                  </p>
                  <div className="btn-group btn-group-sm" role="group">
                    <button className="btn btn-primary">View</button>
                    <button className="btn btn-secondary">Edit</button>
                    <button 
                      className="btn btn-info"
                      onClick={() => {
                        setSelectedPatient(patient);
                        setActiveTab('communication');
                      }}
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Emergency Cases Tab */}
        <div className={`tab-pane fade ${activeTab === 'emergency-cases' ? 'show active' : ''}`}>
          <h2 className="h4 mb-3">Emergency Cases</h2>
          <div className="alert alert-warning">
            <h5 className="alert-heading">
              <i className="bi bi-exclamation-triangle-fill"></i> No Active Emergency Cases
            </h5>
            <p className="mb-0">There are currently no emergency cases requiring immediate attention.</p>
          </div>
          
          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">Emergency Protocol</h5>
            </div>
            <div className="card-body">
              <ul>
                <li>In case of emergency, contact hospital emergency line: Ext. 911</li>
                <li>Critical patients should be prioritized for immediate care</li>
                <li>Notify the head of department for any emergency situations</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Communication Tab */}
        <div className={`tab-pane fade ${activeTab === 'communication' ? 'show active' : ''}`}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">Patient Communication</h2>
            <div className="d-flex align-items-center">
              <select 
                className="form-select form-select-sm me-2" 
                value={selectedPatient ? selectedPatient.id : ''}
                onChange={(e) => setSelectedPatient(patients.find(p => p.id === parseInt(e.target.value)) || null)}
              >
                <option value="">Select Patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
              <button className="btn btn-primary btn-sm">
                <i className="bi bi-telephone"></i> Call Patient
              </button>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Recent Messages</h5>
                </div>
                <div className="list-group list-group-flush" style={{maxHeight: '400px', overflowY: 'auto'}}>
                  {messages.map(msg => (
                    <button 
                      key={msg.id}
                      className={`list-group-item list-group-item-action ${msg.unread ? 'bg-light' : ''}`}
                      onClick={() => {
                        markMessageAsRead(msg.id);
                        setSelectedPatient(patients.find(p => p.name === msg.patient));
                      }}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{msg.patient}</h6>
                        <small>{msg.time.split(' ')[0]}</small>
                      </div>
                      <p className="mb-1 text-truncate">{msg.message}</p>
                      {msg.unread && <span className="badge bg-primary">New</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-md-8">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    {selectedPatient ? `Chat with ${selectedPatient.name}` : 'Select a patient to start conversation'}
                  </h5>
                  {selectedPatient && (
                    <span className="badge bg-success">{selectedPatient.condition}</span>
                  )}
                </div>
                <div className="card-body" style={{height: '300px', overflowY: 'auto'}}>
                  {selectedPatient ? (
                    <div>
                      <div className="alert alert-info py-2">
                        <small>Conversation with {selectedPatient.name} - {selectedPatient.phone}</small>
                      </div>
                      
                      {messages.filter(m => m.patient === selectedPatient.name).map(msg => (
                        <div key={msg.id} className={`d-flex mb-2 ${msg.sentBy === 'doctor' ? 'justify-content-end' : ''}`}>
                          <div className={`rounded p-2 ${msg.sentBy === 'doctor' ? 'bg-primary text-white' : 'bg-light'}`} style={{maxWidth: '70%'}}>
                            {msg.message}
                            <div className="text-end">
                              <small>{msg.time.split(' ')[1]}</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted py-5">
                      <i className="bi bi-chat-square-text display-4"></i>
                      <p className="mt-3">Please select a patient to view messages</p>
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Type your message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      disabled={!selectedPatient}
                    />
                    <button 
                      className="btn btn-primary" 
                      onClick={sendMessage}
                      disabled={!selectedPatient}
                    >
                      <i className="bi bi-send"></i> Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Tab */}
        <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`}>
          <h2 className="h4 mb-3">Doctor Profile</h2>
          
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '100px', height: '100px'}}>
                    <i className="bi bi-person-fill text-white display-4"></i>
                  </div>
                  <h4>Dr. {doctorProfile.name}</h4>
                  <p className="text-muted">{doctorProfile.specialization}</p>
                  <button className="btn btn-outline-primary btn-sm me-2">
                    <i className="bi bi-pencil"></i> Edit Profile
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="bi bi-key"></i> Change Password
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-md-8">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Professional Information</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-sm-4 fw-bold">Email:</div>
                    <div className="col-sm-8">{doctorProfile.email}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-4 fw-bold">Phone:</div>
                    <div className="col-sm-8">{doctorProfile.phone}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-4 fw-bold">Address:</div>
                    <div className="col-sm-8">{doctorProfile.address}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-4 fw-bold">Experience:</div>
                    <div className="col-sm-8">{doctorProfile.experience}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-4 fw-bold">Education:</div>
                    <div className="col-sm-8">{doctorProfile.education}</div>
                  </div>
                </div>
              </div>
              
              <div className="card mt-3">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Schedule & Availability</h5>
                </div>
                <div className="card-body">
                  <div className="alert alert-info">
                    <h6>Current Schedule</h6>
                    <ul className="mb-0">
                      <li>Monday - Friday: 9:00 AM - 5:00 PM</li>
                      <li>Saturday: 10:00 AM - 2:00 PM</li>
                      <li>Sunday: Closed</li>
                    </ul>
                  </div>
                  <button className="btn btn-primary btn-sm">
                    <i className="bi bi-calendar-plus"></i> Update Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notifications Tab */}
        <div className={`tab-pane fade ${activeTab === 'notifications' ? 'show active' : ''}`}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">Notifications</h2>
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}
            >
              Mark All as Read
            </button>
          </div>
          
          <div className="list-group">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div key={notification.id} className={`list-group-item ${notification.read ? '' : 'bg-light'}`}>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{notification.title}</h5>
                    <small>{notification.time}</small>
                  </div>
                  <p className="mb-1">{notification.message}</p>
                  <div className="mt-2">
                    {!notification.read && (
                      <button 
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        Mark as Read
                      </button>
                    )}
                    <button className="btn btn-outline-secondary btn-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-info text-center">
                <i className="bi bi-bell-slash display-4 text-muted"></i>
                <p className="mt-2 mb-0">No notifications at this time.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Reminders Tab */}
        <div className={`tab-pane fade ${activeTab === 'reminders' ? 'show active' : ''}`}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">Reminders</h2>
            <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addReminderModal">
              <i className="bi bi-plus-circle"></i> Add Reminder
            </button>
          </div>
          
          <div className="row">
            {reminders.length > 0 ? (
              reminders.map(reminder => (
                <div key={reminder.id} className="col-md-6 col-lg-4 mb-3">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">{reminder.title}</h6>
                      {getPriorityBadge(reminder.priority)}
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        <i className="bi bi-calendar-event me-2"></i>
                        Due: {reminder.date}
                      </p>
                      <div className="btn-group w-100">
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="bi bi-check-circle"></i> Complete
                        </button>
                        <button className="btn btn-outline-secondary btn-sm">
                          <i className="bi bi-pencil"></i> Edit
                        </button>
                        <button 
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteReminder(reminder.id)}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-info text-center">
                  <i className="bi bi-clock-history display-4 text-muted"></i>
                  <p className="mt-2 mb-0">No reminders set. Add a new reminder to stay organized.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Reminder Modal */}
      <div className="modal fade" id="addReminderModal" tabIndex="-1" aria-labelledby="addReminderModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addReminderModalLabel">Add New Reminder</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="reminderTitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="reminderTitle" placeholder="Enter reminder title" />
                </div>
                <div className="mb-3">
                  <label htmlFor="reminderDate" className="form-label">Due Date</label>
                  <input type="date" className="form-control" id="reminderDate" />
                </div>
                <div className="mb-3">
                  <label htmlFor="reminderPriority" className="form-label">Priority</label>
                  <select className="form-select" id="reminderPriority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="reminderNotes" className="form-label">Notes</label>
                  <textarea className="form-control" id="reminderNotes" rows="3"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Save Reminder</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;