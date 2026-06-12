import React, { useState } from "react";

function Home() {
  const [date, setDate] = useState("");
  const [bookings, setBookings] = useState([]);

  // 1. Updated Date Search Query Endpoint
  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/bookings?eventDate=${date}`
      );
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Error searching bookings:", error);
      alert("Failed to fetch bookings from server");
    }
  };

  // 2. Updated POST Confirmation Endpoint
  const confirmBooking = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/bookings/${id}/confirm`, {
        method: "POST",
      });
      alert(await res.text());
      fetchBookings();
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Failed to confirm booking");
    }
  };

  // 3. Updated DELETE Endpoint
  const deleteBooking = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/bookings/${id}`, {
        method: "DELETE",
      });
      alert(await res.text());
      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking");
    }
  };

  return (
    <div>
      <h2>Search Bookings by Date</h2>

      {/* SEARCH BOX CARD */}
      <div className="form-card" style={{ maxWidth: "400px" }}>
        <label style={{ fontWeight: "600" }}>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={fetchBookings}
          style={{ marginTop: "10px", width: "100%" }}
        >
          Search
        </button>
      </div>

      <h3 style={{ marginTop: "30px" }}>Bookings</h3>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Guests</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.bookingId}>
                  <td>{b.customerName}</td>
                  <td>{b.phoneNumber}</td>
                  <td>{b.eventDate}</td>
                  <td>
                    {b.startTime} – {b.endTime}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "6px",
                        background:
                          b.status === "CONFIRMED" ? "#28a745" : "#ffc107",
                        color: "white",
                        fontWeight: "600"
                      }}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td>{b.noOfGuests}</td>
                  <td>{b.notes}</td>
                  <td>
                    {b.status === "ENQUIRED" && (
                      <button onClick={() => confirmBooking(b.bookingId)}>
                        Confirm
                      </button>
                    )}
                    <button
                      onClick={() => deleteBooking(b.bookingId)}
                      style={{ background: "red", marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Home;