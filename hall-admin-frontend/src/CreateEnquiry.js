import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "./api";

function CreateEnquiry() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: "",
    phoneNumber: "",
    address: "",
    eventName:"",
    eventDate: "",
    startTime: "",
    endTime: "",
    noOfGuests: "",
    notes: ""
  });

  // Protect this page
  useEffect(() => {

    if (localStorage.getItem("loggedIn") !== "true") {
      navigate("/");
    }

  }, [navigate]);

  const updateField = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const submitEnquiry = async () => {

    try {

      const response = await fetch(getApiUrl("/enquiry"), {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(form)

      });

      const message = await response.text();

      if (response.ok) {

        alert(message);

        setForm({
          customerName: "",
          phoneNumber: "",
          address: "",
          eventName:"",
          eventDate: "",
          startTime: "",
          endTime: "",
          noOfGuests: "",
          notes: ""
        });

      } else {

        alert(message);

      }

    } catch (error) {

      console.error(error);

      alert("Unable to connect to server");

    }

  };

  return (

    <div className="form-card">

      <h2>Create Enquiry</h2>

      <input
        name="customerName"
        placeholder="Customer Name"
        value={form.customerName}
        onChange={updateField}
      />

      <input
        name="phoneNumber"
        placeholder="Phone Number"
        value={form.phoneNumber}
        onChange={updateField}
      />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={updateField}
      />
      <input
         name="eventName"
         placeholder="Event Name"
         value={form.eventName}
         onChange={updateField}
      />

      

      <label>Event Date:</label>

      <input
        type="date"
        name="eventDate"
        value={form.eventDate}
        onChange={updateField}
      />

      <label>Start Time:</label>

      <input
        type="time"
        name="startTime"
        value={form.startTime}
        onChange={updateField}
      />

      <label>End Time:</label>

      <input
        type="time"
        name="endTime"
        value={form.endTime}
        onChange={updateField}
      />

      <input
        type="number"
        name="noOfGuests"
        placeholder="Guests Count"
        value={form.noOfGuests}
        onChange={updateField}
      />

      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={updateField}
      />

      <button
        type="button"
        onClick={submitEnquiry}
      >
        Submit Enquiry
      </button>

    </div>

  );

}

export default CreateEnquiry;