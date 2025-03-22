import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Cross, LogIn, UserPlus, X } from 'lucide-react';
import "./LoginPage.css";
import { StoreContext } from '../../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setShowLogin }) {
  const { url } = useContext(StoreContext)
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const userUrl = isLogin ? `${url}/user/login` : `${url}/user/register`;

      console.log(userUrl)
      const response = await axios.post(userUrl, data);
      console.log(response)

      if (response.data.success) {
        console.log('success')
        localStorage.setItem("token", response.data.token)
        toast.success('Welcome')
        if (response.data.form) {
          navigate('/detail-form')
        } else {
          navigate('/')
        }
        reset()
      }
      else {
        toast.error(response.data.message)
      }
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    }
    catch (error) {
      console.log("Error occured: ", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-form">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

          <div className="login-heading">
            <h1>
              {isLogin ? (
                <span>
                  <LogIn size={24} color='black' /> Login
                </span>
              ) : (
                <span>
                  <UserPlus size={24} /> Sign Up
                </span>
              )}
            </h1>
            <span onClick={() => setShowLogin(false)} className="cancel-button">
              <X />
            </span>
          </div>

          <div className="login-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="login-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          {!isLogin && (
            <div className="login-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: value => value === watch("password") || "Passwords do not match"
                })}
              />
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
            </div>
          )}

          {/* Updated Button with Spinner */}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <span className="loadin-spinner"></span>
            ) : (
              isLogin ? 'Login' : 'Sign Up'
            )}
          </button>

          <div className="login-switch">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <a onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Login'}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
