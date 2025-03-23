import React, { useContext } from 'react';
import './Overview.css'; // Ensure you have the corresponding CSS file
import { StoreContext } from '../../../context/StoreContext';

const Overview = () => {
  const { userRoomInfo } = useContext(StoreContext);

  if (!userRoomInfo) {
    return <p>Loading room data...</p>;
  }

  return (
    <div className="container">
      <h1 className="page-title">Dorm Room Overview</h1>
      
      {/* Room Information Card */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Room {userRoomInfo.roomNumber}</h2>
          <span className="badge badge-blue">{userRoomInfo.building}</span>
        </div>
        
        <div className="info-grid">
          <div className="info-item">
            <h3 className="info-label">Floor</h3>
            <p>{userRoomInfo.floor}</p>
          </div>
          <div className="info-item">
            <h3 className="info-label">Occupancy</h3>
            <p>{userRoomInfo.occupants.length}/{userRoomInfo.capacity}</p>
          </div>
          <div className="info-item">
            <h3 className="info-label">Rent</h3>
            <p>&#8377; {userRoomInfo.rent}</p>
          </div>
        </div>
        
        <div className="amenities-section">
          <h3 className="info-label">Facilities</h3>
          <div className="amenities-container">
            {userRoomInfo.facilities.map((facility, index) => (
              <span key={index} className="amenity-tag">{facility}</span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Residents Section */}
      <div className="card">
        <h2 className="card-title">Occupants</h2>
        <div className="residents-list">
          {userRoomInfo.occupants.map((occupant, index) => (
            <div key={index} className="resident-item">
              <div className="resident-avatar">{occupant.charAt(0)}</div>
              <div className="resident-info">
                <h3>User ID: {occupant}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
