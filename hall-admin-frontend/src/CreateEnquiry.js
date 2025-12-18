import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateEnquiry() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: "",
    phoneNumber: "",
    address: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    noOfGuests: "",
    notes: ""
  });

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitEnquiry = async () => {
    const response = await fetch("http://localhost:8080/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert(await response.text());
    navigate("/");
  };

  return (
    <div className="form-card">
      <h2>Create Enquiry</h2>

      <input name="customerName" placeholder="Customer Name" value={form.customerName} onChange={updateField} />
      <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={updateField} />
      <input name="address" placeholder="Address" value={form.address} onChange={updateField} />

      <label>Event Date:</label>
      <input type="date" name="eventDate" value={form.eventDate} onChange={updateField} />

      <label>Start Time:</label>
      <input type="time" name="startTime" value={form.startTime} onChange={updateField} />

      <label>End Time:</label>
      <input type="time" name="endTime" value={form.endTime} onChange={updateField} />

      <input name="noOfGuests" placeholder="Guests Count" value={form.noOfGuests} onChange={updateField} />

      <textarea name="notes" placeholder="Notes" value={form.notes} onChange={updateField}></textarea>

      <button onClick={submitEnquiry}>Submit Enquiry</button>
    </div>
  );
}

export default CreateEnquiry;
