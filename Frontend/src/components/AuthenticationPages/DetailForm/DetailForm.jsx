import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import './DetailForm.css';
import axios from 'axios';
import { StoreContext } from '../../../context/StoreContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DetailForm = () => {

  const {url,token} = useContext(StoreContext)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      occupation: 'Unemployed',
      smoking: false,
      drinking: false,
      profileUrl: '',
      credentialUrl: '',
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(url + "/user/profile-update",data)
      if(response.data.success){
        toast.success('Thank You For Your Details')
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="form-container">
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-section">
          <h2>Basic Information</h2>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address*</label>
            <input
              id="email"
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  message: "Invalid email address"
                }
              })}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              {...register("age", { 
                min: {
                  value: 16,
                  message: "You must be at least 16 years old"
                }
              })}
              className={errors.age ? "error" : ""}
            />
            {errors.age && <span className="error-message">{errors.age.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" {...register("gender")}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="occupation">Occupation</label>
            <input
              id="occupation"
              type="text"
              {...register("occupation")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              id="phone_number"
              type="tel"
              {...register("phone_number")}
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Profile Information</h2>
          
          <div className="form-group">
            <label htmlFor="profileUrl">Profile Picture URL</label>
            <input
              id="profileUrl"
              type="url"
              {...register("profileUrl")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="credentialUrl">Credential URL</label>
            <input
              id="credentialUrl"
              type="url"
              {...register("credentialUrl")}
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Lifestyle Preferences</h2>
          
          <div className="form-group">
            <label htmlFor="sleepSchedule">Sleep Schedule</label>
            <select id="sleepSchedule" {...register("sleepSchedule")}>
              <option value="">Select sleep schedule</option>
              <option value="Night Owl">Night Owl</option>
              <option value="Early Bird">Early Bird</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cleanliness">Cleanliness</label>
            <select id="cleanliness" {...register("cleanliness")}>
              <option value="">Select cleanliness level</option>
              <option value="Messy">Messy</option>
              <option value="Clean">Clean</option>
              <option value="Very Clean">Very Clean</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="socialPreference">Social Preference</label>
            <select id="socialPreference" {...register("socialPreference")}>
              <option value="">Select social preference</option>
              <option value="Introvert">Introvert</option>
              <option value="Extrovert">Extrovert</option>
              <option value="Neutral">Neutral</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dietary">Dietary Preference</label>
            <select id="dietary" {...register("dietary")}>
              <option value="">Select dietary preference</option>
              <option value="Veg">Vegetarian</option>
              <option value="Non-Veg">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                {...register("smoking")}
              />
              <span>I smoke</span>
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                {...register("drinking")}
              />
              <span>I drink alcohol</span>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h2>Housing Information</h2>
          
          <div className="form-group">
            <label htmlFor="budget">Monthly Budget*</label>
            <input
              id="budget"
              type="number"
              {...register("budget", { 
                required: "Budget is required",
                min: {
                  value: 1000,
                  message: "Minimum budget is 1000"
                }
              })}
              className={errors.budget ? "error" : ""}
            />
            {errors.budget && <span className="error-message">{errors.budget.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="location">Preferred Location</label>
            <input
              id="location"
              type="text"
              {...register("location")}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Register</button>
          <button type="reset" className="reset-btn">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default DetailForm;