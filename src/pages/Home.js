import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Welcome to the Hospital Appointment System</h2>
      <p>Register as a doctor or patient to start managing appointments.</p>
      <button onClick={() => navigate("/register")}>Go to Register</button>
    </div>
  );
};

export default Home;
