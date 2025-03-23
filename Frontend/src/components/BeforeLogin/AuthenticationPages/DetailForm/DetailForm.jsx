import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../../context/StoreContext';
import './DetailForm.css';

const DetailForm = () => {
  const { url, token, setMatches, userInfo } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  console.log(userInfo)

  const { register, handleSubmit,reset, formState: { errors } } = useForm({
    defaultValues: {
      occupation: 'student',
      smoking: false,
      drinking: false,
      cleanliness: 'clean',
      sleepSchedule: 'night owl',
      dietaryPreference: 'No Preference',
      email: ''
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);

    data.smoking = !!data.smoking;
    data.drinking = !!data.drinking;
    data.roommateSmoking = !!data.roommateSmoking;
    data.roommateDrinking = !!data.roommateDrinking;

    try {
      const response = await axios.post(url + "/user/find-roommate", data, { token });
      if (response.data.success) {
        setMatches(response.data.matches)
        toast.success('Your Preferences Have Been Saved!');
        navigate("/matches");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save preferences. Try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      reset({
        email: userInfo.email || '',
      });
    }
  }, [userInfo, reset]);

  return (
    <div className="detail-form-container">
      <h1>Find Your Ideal Roommate or Room</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Personal Information */}
        <div className="detail-form-section">
          <h2>Personal Information</h2>

          <div className="detail-form-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" type="text" {...register("name", { required: "Name is required" })} className={errors.name ? "detail-form-error" : ""} />
            {errors.name && <span className="detail-form-error-message">{errors.name.message}</span>}
          </div>

          <div className="detail-form-group">
            <label htmlFor="email">Email Address*</label>
            <input id="email" type="email" readOnly value={userInfo.email} {...register("email", { required: "Email is required" })} className={errors.email ? "detail-form-error" : ""} />
            {errors.email && <span className="detail-form-error-message">{errors.email.message}</span>}
          </div>

          <div className="detail-form-group">
            <label htmlFor="age">Age</label>
            <input id="age" type="number" {...register("age", { min: { value: 16, message: "You must be at least 16 years old" }, required: "Email is required" })} className={errors.age ? "detail-form-error" : ""} />
            {errors.age && <span className="detail-form-error-message">{errors.age.message}</span>}
          </div>

          <div className="detail-form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" {...register("gender", { required: "Gender is required" })}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="detail-form-error-message">{errors.gender.message}</span>}
          </div>
        </div>

        {/* Housing Preferences */}
        <div className="detail-form-section">
          <h2>Housing Preferences</h2>

          <div className="detail-form-group">
            <label htmlFor="occupation">Occupation</label>
            <select id="occupation" {...register("occupation", { required: "Occupation is required" })}>
              <option value="student">Student</option>
              <option value="job">Job</option>
              <option value="unemployed">Unemployed</option>
            </select>
          </div>

          <div className="detail-form-group">
            <label htmlFor="budget">Monthly Budget*</label>
            <input id="budget" type="number" {...register("budget", { required: "Budget is required", min: { value: 1000, message: "Minimum budget is 1000" } })} className={errors.budget ? "detail-form-error" : ""} />
            {errors.budget && <span className="detail-form-error-message">{errors.budget.message}</span>}
          </div>
        </div>

        {/* Lifestyle Preferences */}
        <div className="detail-form-section">
          <h2>Lifestyle Preferences</h2>

          <div className="detail-form-group">
            <label htmlFor="cleanliness">Cleanliness Level</label>
            <select id="cleanliness" {...register("cleanliness")}>
              <option value="messy">Messy</option>
              <option value="clean">Clean</option>
              <option value="very clean">Very Clean</option>
            </select>
          </div>

          <div className="detail-form-group">
            <label htmlFor="sleepSchedule">Sleep Schedule</label>
            <select id="sleepSchedule" {...register("sleepSchedule")}>
              <option value="night owl">Night Owl</option>
              <option value="early bird">Early Bird</option>
            </select>
          </div>

          <div className="detail-form-group">
            <label>Do You Smoke?</label>
            <input type="checkbox" {...register("smoking")} /> Yes
          </div>

          <div className="detail-form-group">
            <label>Do You Drink Alcohol?</label>
            <input type="checkbox" {...register("drinking")} /> Yes
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="detail-form-section">
          <h2>Dietary Preferences</h2>

          <div className="detail-form-group">
            <label htmlFor="dietaryPreference">Dietary Preference</label>
            <select id="dietaryPreference" {...register("dietaryPreference")}>
              <option value="No Preference">No Preference</option>
              <option value="veg">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="non-veg">Non-Vegetarian</option>
            </select>
          </div>
        </div>

        {/* Roommate Preferences */}
        <div className="detail-form-section">
          <h2>Roommate Preferences</h2>

          <div className="detail-form-group">
            <label htmlFor="socialPreference">Social Preference</label>
            <select id="socialPreference" {...register("socialPreference")}>
              <option value="introvert">Introvert</option>
              <option value="extrovert">Extrovert</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>

          <div className="detail-form-group">
            <label>Do You Prefer a Non-Smoking Roommate?</label>
            <input type="checkbox" {...register("roommateSmoking")} /> Yes
          </div>

          <div className="detail-form-group">
            <label>Do You Prefer a Non-Drinking Roommate?</label>
            <input type="checkbox" {...register("roommateDrinking")} /> Yes
          </div>
        </div>

        {/* Form Actions */}
        <div className="detail-form-actions">
          <button type="submit" className="detail-form-submit-btn" disabled={loading}>
            {loading ? "Finding..." : "Find My Match"}
          </button>
          <button type="reset" className="detail-form-reset-btn">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default DetailForm;
