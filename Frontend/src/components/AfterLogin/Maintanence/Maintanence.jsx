import React, { useState, useEffect } from 'react';
import './Maintenance.css';

const Maintenance = () => {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({
    title: '',
    description: '',
    location: '',
    priority: 'low',
    reportedBy: '',
    status: 'pending',
    date: new Date().toISOString().substr(0, 10)
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // You could load saved issues from localStorage here
    const savedIssues = localStorage.getItem('dormMaintenanceIssues');
    if (savedIssues) {
      setIssues(JSON.parse(savedIssues));
    }
  }, []);

  useEffect(() => {
    // Save issues to localStorage when they change
    localStorage.setItem('dormMaintenanceIssues', JSON.stringify(issues));
  }, [issues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIssue({
      ...newIssue,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newIssue.title || !newIssue.location || !newIssue.reportedBy) return;
    
    const issueWithId = {
      ...newIssue,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    setIssues([...issues, issueWithId]);
    setNewIssue({
      title: '',
      description: '',
      location: '',
      priority: 'low',
      reportedBy: '',
      status: 'pending',
      date: new Date().toISOString().substr(0, 10)
    });
  };

  const updateIssueStatus = (id, newStatus) => {
    const updatedIssues = issues.map(issue => 
      issue.id === id ? { ...issue, status: newStatus } : issue
    );
    setIssues(updatedIssues);
  };

  const deleteIssue = (id) => {
    const updatedIssues = issues.filter(issue => issue.id !== id);
    setIssues(updatedIssues);
  };

  const filteredIssues = filter === 'all' 
    ? issues 
    : issues.filter(issue => issue.status === filter);

  const priorityColors = {
    low: 'maintenance-priority-low',
    medium: 'maintenance-priority-medium',
    high: 'maintenance-priority-high',
    urgent: 'maintenance-priority-urgent'
  };

  const statusLabels = {
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed',
    canceled: 'Canceled'
  };

  return (
    <div className="maintenance-container">
      <h1 className="maintenance-title">Dorm Maintenance Tracker</h1>
      
      <div className="maintenance-section">
        <h2 className="maintenance-section-title">Report New Issue</h2>
        <form onSubmit={handleSubmit} className="maintenance-form">
          <div className="maintenance-form-group">
            <label className="maintenance-label">Issue Title:</label>
            <input
              type="text"
              name="title"
              value={newIssue.title}
              onChange={handleInputChange}
              placeholder="Brief description of the issue"
              className="maintenance-input"
              required
            />
          </div>

          <div className="maintenance-form-group">
            <label className="maintenance-label">Location:</label>
            <input
              type="text"
              name="location"
              value={newIssue.location}
              onChange={handleInputChange}
              placeholder="Where in the dorm is this issue? (e.g., bathroom, kitchen)"
              className="maintenance-input"
              required
            />
          </div>

          <div className="maintenance-form-group">
            <label className="maintenance-label">Detailed Description:</label>
            <textarea
              name="description"
              value={newIssue.description}
              onChange={handleInputChange}
              placeholder="Provide details about the issue"
              className="maintenance-textarea"
              rows="3"
            />
          </div>

          <div className="maintenance-form-row">
            <div className="maintenance-form-group">
              <label className="maintenance-label">Priority:</label>
              <select
                name="priority"
                value={newIssue.priority}
                onChange={handleInputChange}
                className="maintenance-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="maintenance-form-group">
              <label className="maintenance-label">Date Noticed:</label>
              <input
                type="date"
                name="date"
                value={newIssue.date}
                onChange={handleInputChange}
                className="maintenance-input"
              />
            </div>
          </div>

          <div className="maintenance-form-group">
            <label className="maintenance-label">Reported By:</label>
            <input
              type="text"
              name="reportedBy"
              value={newIssue.reportedBy}
              onChange={handleInputChange}
              placeholder="Your name"
              className="maintenance-input"
              required
            />
          </div>

          <button type="submit" className="maintenance-button">Submit Maintenance Request</button>
        </form>
      </div>

      <div className="maintenance-section">
        <div className="maintenance-header">
          <h2 className="maintenance-section-title">Maintenance Issues</h2>
          <div className="maintenance-filter">
            <label className="maintenance-filter-label">Filter by Status:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="maintenance-select"
            >
              <option value="all">All Issues</option>
              <option value="pending">Pending</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>

        {filteredIssues.length > 0 ? (
          <div className="maintenance-issues-list">
            {filteredIssues.map(issue => (
              <div key={issue.id} className="maintenance-issue-card">
                <div className="maintenance-issue-header">
                  <h3 className="maintenance-issue-title">{issue.title}</h3>
                  <span className={`maintenance-badge ${priorityColors[issue.priority]}`}>
                    {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                  </span>
                </div>
                
                <div className="maintenance-issue-details">
                  <p className="maintenance-issue-location"><strong>Location:</strong> {issue.location}</p>
                  <p className="maintenance-issue-description"><strong>Description:</strong> {issue.description || 'No description provided.'}</p>
                  <p className="maintenance-issue-info"><strong>Reported By:</strong> {issue.reportedBy}</p>
                  <p className="maintenance-issue-info"><strong>Date Reported:</strong> {new Date(issue.date).toLocaleDateString()}</p>
                  <p className="maintenance-issue-status">
                    <strong>Status:</strong> 
                    <span className={`maintenance-status-badge maintenance-status-${issue.status}`}>
                      {statusLabels[issue.status]}
                    </span>
                  </p>
                </div>
                
                <div className="maintenance-issue-actions">
                  {issue.status === 'pending' && (
                    <button 
                      onClick={() => updateIssueStatus(issue.id, 'inProgress')}
                      className="maintenance-action-button maintenance-action-start"
                    >
                      Mark In Progress
                    </button>
                  )}
                  
                  {issue.status === 'inProgress' && (
                    <button 
                      onClick={() => updateIssueStatus(issue.id, 'completed')}
                      className="maintenance-action-button maintenance-action-complete"
                    >
                      Mark Completed
                    </button>
                  )}
                  
                  {(issue.status === 'pending' || issue.status === 'inProgress') && (
                    <button 
                      onClick={() => updateIssueStatus(issue.id, 'canceled')}
                      className="maintenance-action-button maintenance-action-cancel"
                    >
                      Cancel Request
                    </button>
                  )}
                  
                  <button 
                    onClick={() => deleteIssue(issue.id)}
                    className="maintenance-action-button maintenance-action-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="maintenance-empty-message">No maintenance issues {filter !== 'all' ? `with status "${statusLabels[filter]}"` : ''} found.</p>
        )}
      </div>
    </div>
  );
};

export default Maintenance;