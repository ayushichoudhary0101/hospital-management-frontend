import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";

const Register = () => {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient', // Default role is "patient"
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const { name, email, password, role } = signupInfo;
      
        // Validate required fields
        if (!name || !email || !password) {
          return handleError('Name, email, and password are required');
        }
      
        try {
          // API request for user registration
          const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, role }),
          });
      
          const result = await response.json();
      console.log(result,"result")
          // Destructure the response
          const { success, message, error } = result;
      
          if (success) {
            // On successful registration, navigate to the login page
            handleSuccess(message); // Show success message
            setTimeout(() => {
              navigate('/login'); // Redirect after showing the success message
            }, 2000);
          } else {
            // Handle errors from the API
            if (error) {
              handleError(error); // Show API error message
            } else {
              handleError(message || 'Registration failed'); // Show general error message
            }
          }
        } catch (err) {
          // Handle network or unexpected errors
          handleError('An unexpected error occurred: ' + err.message);
        }
      };
      
    

    return (
        <div className="container">
            <h1>Hospital Appointment System</h1>
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        placeholder="Enter your name..."
                        value={signupInfo.name}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Enter your email..."
                        value={signupInfo.email}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                        value={signupInfo.password}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role">Role</label>
                    <select
                        name="role"
                        value={signupInfo.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </div>
                <button type="submit">Register</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;
