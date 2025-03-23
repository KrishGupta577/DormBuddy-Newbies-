import React, { useState, useContext, useEffect } from "react";
import "./Maintenance.css";
import { StoreContext } from "../../../context/StoreContext";

const Maintenance = () => {
  // Get room data from context
  const { userRoomInfo } = useContext(StoreContext);

  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    priority: "low",
    reportedBy: "",
    date: new Date().toISOString().substr(0, 10),
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {

  }, [userRoomInfo])

  if (!userRoomInfo) return <p>Loading room details...</p>;

  const handleInputChange = (e) => {
    setNewIssue({ ...newIssue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newIssue.title || !newIssue.reportedBy) return;

    // Simulating API call to add maintenance issue
    console.log("New Issue Submitted:", newIssue);
  };

  const handleStatusUpdate = (issueId, newStatus) => {
    console.log(`Updating issue ${issueId} to status: ${newStatus}`);
  };

  const handleDelete = (issueId) => {
    console.log(`Deleting issue ${issueId}`);
  };

  const statusLabels = {
    pending: "Pending",
    inProgress: "In Progress",
    completed: "Completed",
    canceled: "Canceled",
  };

  const priorityColors = {
    low: "priority-low",
    medium: "priority-medium",
    high: "priority-high",
    urgent: "priority-urgent",
  };

  const filteredIssues =
    filter === "all"
      ? userRoomInfo.maintenances
      : userRoomInfo.maintenances.filter((issue) => issue.status === filter);

  return (
    <div className="maintenance-container">
      <h1 className="maintenance-title">Room Maintenance Tracker</h1>

      {/* Room Details */}
      <div className="maintenance-section room-details-section">
        <h2 className="maintenance-section-title">Room Information</h2>
        <div className="room-details-card">
          <div className="room-header">
            <h3 className="room-number">Room {userRoomInfo.roomNumber}</h3>
            <span className={`room-badge ${userRoomInfo.isAvailable ? "room-available" : "room-occupied"}`}>
              {userRoomInfo.isAvailable ? "Available" : "Occupied"}
            </span>
          </div>

          <div className="room-details-grid">
            <div className="room-detail-item">
              <span className="detail-label">Building:</span>
              <span className="detail-value">{userRoomInfo.building}</span>
            </div>
            <div className="room-detail-item">
              <span className="detail-label">Floor:</span>
              <span className="detail-value">{userRoomInfo.floor}</span>
            </div>
            <div className="room-detail-item">
              <span className="detail-label">Capacity:</span>
              <span className="detail-value">{userRoomInfo.capacity} persons</span>
            </div>
            <div className="room-detail-item">
              <span className="detail-label">Rent:</span>
              <span className="detail-value">${userRoomInfo.rent.toLocaleString()}</span>
            </div>
            <div className="room-detail-item full-width">
              <span className="detail-label">Facilities:</span>
              <div className="facilities-list">
                {userRoomInfo.facilities.map((facility, index) => (
                  <span key={index} className="facility-badge">{facility}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report New Issue */}
      <div className="maintenance-section">
        <h2 className="maintenance-section-title">Report New Issue</h2>
        <form onSubmit={handleSubmit} className="maintenance-form">
          <input type="text" name="title" value={newIssue.title} onChange={handleInputChange} placeholder="Issue Title" required />
          <textarea name="description" value={newIssue.description} onChange={handleInputChange} placeholder="Description" />
          <select name="priority" value={newIssue.priority} onChange={handleInputChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          <input type="date" name="date" value={newIssue.date} onChange={handleInputChange} />
          <input type="text" name="reportedBy" value={newIssue.reportedBy} onChange={handleInputChange} placeholder="Your Name" required />
          <button type="submit">Submit Request</button>
        </form>
      </div>

      {/* Maintenance Issues */}
      <div className="maintenance-section">
        <h2 className="maintenance-section-title">Maintenance Issues</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Issues</option>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>

        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <div key={issue._id} className="maintenance-issue-card">
              <h3>{issue.issue}</h3>
              <p><strong>Reported By:</strong> {issue.reportedBy}</p>
              <p><strong>Date:</strong> {new Date(issue.dateSubmitted).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {statusLabels[issue.status]}</p>

              <div className="maintenance-issue-actions">
                {issue.status === "pending" && <button onClick={() => handleStatusUpdate(issue._id, "inProgress")}>Mark In Progress</button>}
                {issue.status === "inProgress" && <button onClick={() => handleStatusUpdate(issue._id, "completed")}>Mark Completed</button>}
                {(issue.status === "pending" || issue.status === "inProgress") && <button onClick={() => handleStatusUpdate(issue._id, "canceled")}>Cancel</button>}
                <button onClick={() => handleDelete(issue._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No maintenance issues found.</p>
        )}
      </div>
    </div>
  );
};

export default Maintenance;
