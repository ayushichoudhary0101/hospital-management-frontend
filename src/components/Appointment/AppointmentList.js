import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await axios.get("/api/appointments");
      setAppointments(response.data);
    };
    fetchAppointments();
  }, []);

  return (
    <div>
      <h3>Appointments</h3>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            {appointment.date} - Doctor: {appointment.doctorId} - Patient:{" "}
            {appointment.patientId} - Status: {appointment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
