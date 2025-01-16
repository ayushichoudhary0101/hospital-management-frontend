import React from "react";
import BookAppointment from "../components/Appointment/BookAppointment";
import AppointmentList from "../components/Appointment/AppointmentList";

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <BookAppointment />
        </div>
        <div className="col-md-6">
          <AppointmentList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
