import React, { useContext, useEffect } from 'react';
import './Overview.css'; // Ensure you have the corresponding CSS file
import { StoreContext } from '../../../context/StoreContext';

const Overview = () => {
  const { userRoomInfo } = useContext(StoreContext);

  useEffect(()=>{

  },[userRoomInfo])
  
  // Ensure data is loaded before rendering
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
          <span className="badge badge-blue">{userRoomInfo.building || "N/A"}</span>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <h3 className="info-label">Floor</h3>
            <p>{userRoomInfo.floor || "N/A"}</p>
          </div>
          <div className="info-item">
            <h3 className="info-label">Occupancy</h3>
            <p>{userRoomInfo.occupants?.length || 0}/{userRoomInfo.capacity || "N/A"}</p>
          </div>
          <div className="info-item">
            <h3 className="info-label">Rent</h3>
            <p>&#8377; {userRoomInfo.rent || "N/A"}</p>
          </div>
        </div>

        {userRoomInfo.facilities && userRoomInfo.facilities.length > 0 && (
          <div className="amenities-section">
            <h3 className="info-label">Facilities</h3>
            <div className="amenities-container">
              {userRoomInfo.facilities.map((facility, index) => (
                <span key={index} className="amenity-tag">{facility}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Residents Section */}
      <div className="card">
        <h2 className="card-title">Occupants</h2>
        {userRoomInfo.occupants && userRoomInfo.occupants.length > 0 ? (
          <div className="residents-list">
            {userRoomInfo.occupants.map((occupant, index) => (
              <div key={index} className="resident-item">
                <div className="resident-avatar">{occupant.charAt(0).toUpperCase()}</div>
                <div className="resident-info">
                  <h3>User ID: {occupant}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No occupants found.</p>
        )}
      </div>
    </div>
  );
};

export default Overview;
