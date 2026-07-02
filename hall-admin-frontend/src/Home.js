import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "./api";

function Home() {

  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [bookings, setBookings] = useState([]);

  // Protect this page
  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "true") {
      navigate("/");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  // Search bookings
  const fetchBookings = async () => {
    try {

      const res = await fetch(
        getApiUrl(`/bookings?eventDate=${date}`)
      );

      const data = await res.json();

      setBookings(data);

    } catch (error) {

      console.error("Error searching bookings:", error);

      alert("Failed to fetch bookings from server");

    }
  };

  // Confirm booking
  const confirmBooking = async (id) => {

    try {

      const res = await fetch(
        getApiUrl(`/bookings/${id}/confirm`),
        {
          method: "POST",
        }
      );

      alert(await res.text());

      fetchBookings();

    } catch (error) {

      console.error("Error confirming booking:", error);

      alert("Failed to confirm booking");

    }

  };

  // Delete booking
  const deleteBooking = async (id) => {

    try {

      const res = await fetch(
        getApiUrl(`/bookings/${id}`),
        {
          method: "DELETE",
        }
      );

      alert(await res.text());

      fetchBookings();

    } catch (error) {

      console.error("Error deleting booking:", error);

      alert("Failed to delete booking");

    }

  };

  return (

    <div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >

        <h2>Search Bookings</h2>

        <button onClick={logout}>
          Logout
        </button>

      </div>

      {/* Search Card */}

      <div
        className="form-card"
        style={{ maxWidth: "400px" }}
      >

        <label style={{ fontWeight: "600" }}>
          Select Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={fetchBookings}
          style={{
            marginTop: "10px",
            width: "100%",
          }}
        >
          Search
        </button>

      </div>

      <h3 style={{ marginTop: "30px" }}>
        Bookings
      </h3>

      {bookings.length === 0 ? (

        <p>No bookings found.</p>

      ) : (

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>
                <th>Name</th>
                <th>Event Name</th>
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
                  <td>{b.eventName}</td>

                  <td>{b.phoneNumber}</td>

                  <td>{b.eventDate}</td>

                  <td>
                    {b.startTime} - {b.endTime}
                  </td>

                  <td>

                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "6px",
                        background:
                          b.status === "CONFIRMED"
                            ? "#28a745"
                            : "#ffc107",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      {b.status}
                    </span>

                  </td>

                  <td>{b.noOfGuests}</td>

                  <td>{b.notes}</td>

                  <td>

                    <div className="table-actions">

                      {b.status === "ENQUIRED" && (

                        <button
                          className="action-button"
                          onClick={() =>
                            confirmBooking(b.bookingId)
                          }
                        >
                          Confirm
                        </button>

                      )}

                      <button
                        className="action-button delete-button"
                        onClick={() =>
                          deleteBooking(b.bookingId)
                        }
                      >
                        Delete
                      </button>

                    </div>

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