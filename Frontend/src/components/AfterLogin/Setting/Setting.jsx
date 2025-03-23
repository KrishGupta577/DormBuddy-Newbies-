import React, { useState } from 'react';
import './setting.css';

const Setting = () => {
  const [settings, setSettings] = useState({
    roomNumber: '101',
    building: 'East Hall',
    notificationsEnabled: true,
    quietHoursStart: '22:00',
    quietHoursEnd: '07:00',
    theme: 'light',
    roommateInfo: {
      name: 'Alex Smith',
      email: 'alex.smith@university.edu',
      phone: '555-123-4567'
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleRoommateChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      roommateInfo: {
        ...settings.roommateInfo,
        [name]: value
      }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would typically save the settings to your backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="setting-container">
      <h1 className="setting-title">Dorm Room Settings</h1>
      
      <form className="setting-form" onSubmit={handleSave}>
        <div className="setting-section">
          <h2 className="setting-section-title">Room Information</h2>
          
          <div className="setting-form-group">
            <label className="setting-label">Room Number:</label>
            <input
              type="text"
              name="roomNumber"
              value={settings.roomNumber}
              onChange={handleInputChange}
              className="setting-input"
            />
          </div>
          
          <div className="setting-form-group">
            <label className="setting-label">Building:</label>
            <input
              type="text"
              name="building"
              value={settings.building}
              onChange={handleInputChange}
              className="setting-input"
            />
          </div>
        </div>
        
        <div className="setting-section">
          <h2 className="setting-section-title">Preferences</h2>
          
          <div className="setting-form-group">
            <label className="setting-label">Theme:</label>
            <select
              name="theme"
              value={settings.theme}
              onChange={handleInputChange}
              className="setting-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="university">University Colors</option>
            </select>
          </div>
          
          <div className="setting-form-group setting-checkbox-group">
            <input
              type="checkbox"
              id="notifications"
              name="notificationsEnabled"
              checked={settings.notificationsEnabled}
              onChange={handleInputChange}
              className="setting-checkbox"
            />
            <label htmlFor="notifications" className="setting-checkbox-label">
              Enable Notifications
            </label>
          </div>
        </div>
        
        <div className="setting-section">
          <h2 className="setting-section-title">Quiet Hours</h2>
          
          <div className="setting-form-group">
            <label className="setting-label">Start Time:</label>
            <input
              type="time"
              name="quietHoursStart"
              value={settings.quietHoursStart}
              onChange={handleInputChange}
              className="setting-input"
            />
          </div>
          
          <div className="setting-form-group">
            <label className="setting-label">End Time:</label>
            <input
              type="time"
              name="quietHoursEnd"
              value={settings.quietHoursEnd}
              onChange={handleInputChange}
              className="setting-input"
            />
          </div>
        </div>
        
        <div className="setting-section">
          <h2 className="setting-section-title">Roommate Information</h2>
          
          <div className="setting-form-group">
            <label className="setting-label">Name:</label>
            <input
              type="text"
              name="name"
              value={settings.roommateInfo.name}
              onChange={handleRoommateChange}
              className="setting-input"
            />
          </div>
          
          <div className="setting-form-group">
            <label className="setting-label">Email:</label>
            <input
              type="email"
              name="email"
              value={settings.roommateInfo.email}
              onChange={handleRoommateChange}
              className="setting-input"
            />
          </div>
          
          <div className="setting-form-group">
            <label className="setting-label">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={settings.roommateInfo.phone}
              onChange={handleRoommateChange}
              className="setting-input"
            />
          </div>
        </div>
        
        <div className="setting-button-group">
          <button type="submit" className="setting-button setting-save-button">
            Save Settings
          </button>
          <button type="button" className="setting-button setting-cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;