import React, { useState, useEffect } from 'react';
import './Roommates.css';

const Roommates = () => {
  const [roommates, setRoommates] = useState([]);
  const [newRoommate, setNewRoommate] = useState({
    name: '',
    email: '',
    phone: '',
    moveInDate: new Date().toISOString().substr(0, 10),
    moveOutDate: '',
    notes: '',
    depositPaid: false,
    rentStatus: 'current'
  });
  const [editing, setEditing] = useState(null);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    // Load roommates from localStorage
    const savedRoommates = localStorage.getItem('dormRoommates');
    if (savedRoommates) {
      setRoommates(JSON.parse(savedRoommates));
    }
  }, []);

  useEffect(() => {
    // Save roommates to localStorage when they change
    localStorage.setItem('dormRoommates', JSON.stringify(roommates));
  }, [roommates]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRoommate({
      ...newRoommate,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newRoommate.name || !newRoommate.email) return;

    if (editing) {
      // Update existing roommate
      const updatedRoommates = roommates.map(roommate => 
        roommate.id === editing ? { ...newRoommate, id: editing } : roommate
      );
      setRoommates(updatedRoommates);
      setEditing(null);
    } else {
      // Add new roommate
      const roommateWithId = {
        ...newRoommate,
        id: Date.now(),
        dateAdded: new Date().toISOString()
      };
      setRoommates([...roommates, roommateWithId]);
    }

    // Reset form
    setNewRoommate({
      name: '',
      email: '',
      phone: '',
      moveInDate: new Date().toISOString().substr(0, 10),
      moveOutDate: '',
      notes: '',
      depositPaid: false,
      rentStatus: 'current'
    });
  };

  const startEditing = (roommate) => {
    setEditing(roommate.id);
    setNewRoommate(roommate);
  };

  const cancelEditing = () => {
    setEditing(null);
    setNewRoommate({
      name: '',
      email: '',
      phone: '',
      moveInDate: new Date().toISOString().substr(0, 10),
      moveOutDate: '',
      notes: '',
      depositPaid: false,
      rentStatus: 'current'
    });
  };

  const archiveRoommate = (id) => {
    const updatedRoommates = roommates.map(roommate => 
      roommate.id === id ? { ...roommate, archived: true } : roommate
    );
    setRoommates(updatedRoommates);
  };

  const restoreRoommate = (id) => {
    const updatedRoommates = roommates.map(roommate => 
      roommate.id === id ? { ...roommate, archived: false } : roommate
    );
    setRoommates(updatedRoommates);
  };

  const deleteRoommate = (id) => {
    if (window.confirm('Are you sure you want to delete this roommate? This action cannot be undone.')) {
      const updatedRoommates = roommates.filter(roommate => roommate.id !== id);
      setRoommates(updatedRoommates);
    }
  };

  const updateRentStatus = (id, status) => {
    const updatedRoommates = roommates.map(roommate => 
      roommate.id === id ? { ...roommate, rentStatus: status } : roommate
    );
    setRoommates(updatedRoommates);
  };

  const filteredRoommates = roommates.filter(roommate => 
    showArchived ? roommate.archived : !roommate.archived
  );

  const rentStatusLabels = {
    current: 'Current',
    late: 'Late',
    paid: 'Paid'
  };

  const rentStatusClasses = {
    current: 'roommate-status-current',
    late: 'roommate-status-late',
    paid: 'roommate-status-paid'
  };

  return (
    <div className="roommate-container">
      <h1 className="roommate-title">Dorm Roommates Management</h1>
      
      <div className="roommate-section">
        <h2 className="roommate-section-title">
          {editing ? 'Edit Roommate Information' : 'Add New Roommate'}
        </h2>
        
        <form onSubmit={handleSubmit} className="roommate-form">
          <div className="roommate-form-group">
            <label className="roommate-label">Name:</label>
            <input
              type="text"
              name="name"
              value={newRoommate.name}
              onChange={handleInputChange}
              placeholder="Full name"
              className="roommate-input"
              required
            />
          </div>

          <div className="roommate-form-row">
            <div className="roommate-form-group">
              <label className="roommate-label">Email:</label>
              <input
                type="email"
                name="email"
                value={newRoommate.email}
                onChange={handleInputChange}
                placeholder="Email address"
                className="roommate-input"
                required
              />
            </div>

            <div className="roommate-form-group">
              <label className="roommate-label">Phone:</label>
              <input
                type="tel"
                name="phone"
                value={newRoommate.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
                className="roommate-input"
              />
            </div>
          </div>

          <div className="roommate-form-row">
            <div className="roommate-form-group">
              <label className="roommate-label">Move-in Date:</label>
              <input
                type="date"
                name="moveInDate"
                value={newRoommate.moveInDate}
                onChange={handleInputChange}
                className="roommate-input"
              />
            </div>

            <div className="roommate-form-group">
              <label className="roommate-label">Move-out Date (if known):</label>
              <input
                type="date"
                name="moveOutDate"
                value={newRoommate.moveOutDate}
                onChange={handleInputChange}
                className="roommate-input"
              />
            </div>
          </div>

          <div className="roommate-form-row">
            <div className="roommate-form-group">
              <label className="roommate-label">Rent Status:</label>
              <select
                name="rentStatus"
                value={newRoommate.rentStatus}
                onChange={handleInputChange}
                className="roommate-select"
              >
                <option value="current">Current (Not Yet Due)</option>
                <option value="late">Late</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div className="roommate-form-group roommate-checkbox-group">
              <label className="roommate-checkbox-label">
                <input
                  type="checkbox"
                  name="depositPaid"
                  checked={newRoommate.depositPaid}
                  onChange={handleInputChange}
                  className="roommate-checkbox"
                />
                Security Deposit Paid
              </label>
            </div>
          </div>

          <div className="roommate-form-group">
            <label className="roommate-label">Notes:</label>
            <textarea
              name="notes"
              value={newRoommate.notes}
              onChange={handleInputChange}
              placeholder="Any additional information about this roommate"
              className="roommate-textarea"
              rows="3"
            />
          </div>

          <div className="roommate-form-buttons">
            <button type="submit" className="roommate-button roommate-button-primary">
              {editing ? 'Update Roommate' : 'Add Roommate'}
            </button>
            
            {editing && (
              <button 
                type="button" 
                onClick={cancelEditing}
                className="roommate-button roommate-button-secondary"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="roommate-section">
        <div className="roommate-header">
          <h2 className="roommate-section-title">
            {showArchived ? 'Archived Roommates' : 'Current Roommates'}
          </h2>
          <button 
            onClick={() => setShowArchived(!showArchived)}
            className="roommate-toggle-button"
          >
            {showArchived ? 'Show Current Roommates' : 'Show Archived Roommates'}
          </button>
        </div>

        {filteredRoommates.length > 0 ? (
          <div className="roommate-list">
            {filteredRoommates.map(roommate => (
              <div key={roommate.id} className="roommate-card">
                <div className="roommate-card-header">
                  <h3 className="roommate-name">{roommate.name}</h3>
                  <span className={`roommate-rent-status ${rentStatusClasses[roommate.rentStatus]}`}>
                    {rentStatusLabels[roommate.rentStatus]}
                  </span>
                </div>
                
                <div className="roommate-card-body">
                  <div className="roommate-info-group">
                    <p className="roommate-info">
                      <i className="roommate-icon roommate-icon-email"></i>
                      <strong>Email:</strong> {roommate.email}
                    </p>
                    {roommate.phone && (
                      <p className="roommate-info">
                        <i className="roommate-icon roommate-icon-phone"></i>
                        <strong>Phone:</strong> {roommate.phone}
                      </p>
                    )}
                  </div>

                  <div className="roommate-info-group">
                    <p className="roommate-info">
                      <i className="roommate-icon roommate-icon-calendar"></i>
                      <strong>Move-in Date:</strong> {new Date(roommate.moveInDate).toLocaleDateString()}
                    </p>
                    {roommate.moveOutDate && (
                      <p className="roommate-info">
                        <i className="roommate-icon roommate-icon-calendar"></i>
                        <strong>Move-out Date:</strong> {new Date(roommate.moveOutDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="roommate-info-group">
                    <p className="roommate-info">
                      <i className="roommate-icon roommate-icon-deposit"></i>
                      <strong>Security Deposit:</strong> {roommate.depositPaid ? 'Paid' : 'Not Paid'}
                    </p>
                  </div>

                  {roommate.notes && (
                    <div className="roommate-notes">
                      <p className="roommate-notes-title">Notes:</p>
                      <p className="roommate-notes-content">{roommate.notes}</p>
                    </div>
                  )}
                </div>

                {!showArchived && (
                  <div className="roommate-card-actions">
                    <div className="roommate-rent-actions">
                      <span className="roommate-action-label">Rent Status:</span>
                      <button 
                        onClick={() => updateRentStatus(roommate.id, 'current')}
                        className={`roommate-status-button ${roommate.rentStatus === 'current' ? 'roommate-status-active' : ''}`}
                      >
                        Current
                      </button>
                      <button 
                        onClick={() => updateRentStatus(roommate.id, 'late')}
                        className={`roommate-status-button ${roommate.rentStatus === 'late' ? 'roommate-status-active' : ''}`}
                      >
                        Late
                      </button>
                      <button 
                        onClick={() => updateRentStatus(roommate.id, 'paid')}
                        className={`roommate-status-button ${roommate.rentStatus === 'paid' ? 'roommate-status-active' : ''}`}
                      >
                        Paid
                      </button>
                    </div>
                  </div>
                )}

                <div className="roommate-card-footer">
                  {showArchived ? (
                    <>
                      <button 
                        onClick={() => restoreRoommate(roommate.id)}
                        className="roommate-button roommate-button-secondary"
                      >
                        Restore
                      </button>
                      <button 
                        onClick={() => deleteRoommate(roommate.id)}
                        className="roommate-button roommate-button-danger"
                      >
                        Delete Permanently
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => startEditing(roommate)}
                        className="roommate-button roommate-button-secondary"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => archiveRoommate(roommate.id)}
                        className="roommate-button roommate-button-muted"
                      >
                        Archive
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="roommate-empty-message">
            {showArchived 
              ? 'No archived roommates found.' 
              : 'No current roommates found. Add your first roommate using the form above!'}
          </p>
        )}
      </div>
    </div>
  );
};

export default Roommates;