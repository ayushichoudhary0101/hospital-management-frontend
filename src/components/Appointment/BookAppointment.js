import React, { useState } from "react";
import axios from "axios";

const BookAppointment = () => {
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/appointments/book", {
        doctorId,
        patientId,
        date,
      });
      alert(response.data.message);
    } catch (error) {
      alert("Error booking appointment");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Book Appointment</h3>
      <input
        type="text"
        placeholder="Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Book</button>
    </form>
  );
};

export default BookAppointment;
