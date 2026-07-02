import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "./api";

function Dashboard() {

  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);

  useEffect(() => {

    // Check Login
    if (localStorage.getItem("loggedIn") !== "true") {
      navigate("/");
      return;
    }

    // Dashboard Summary
    fetch(getApiUrl("/dashboard/summary"))
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(err => console.error("Error fetching summary:", err));

    // Upcoming Bookings
    fetch(getApiUrl("/dashboard/upcoming"))
      .then(res => res.json())
      .then(data => setUpcomingBookings(data))
      .catch(err => console.error("Error fetching upcoming bookings:", err));

    // Recent Enquiries
    fetch(getApiUrl("/dashboard/recent-enquiries"))
      .then(res => res.json())
      .then(data => setRecentEnquiries(data))
      .catch(err => console.error("Error fetching recent enquiries:", err));

  }, [navigate]);

  const logout = () => {

    localStorage.removeItem("loggedIn");

    navigate("/");

  };

  if (!summary) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="dashboard-container">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h2>RMJ Hall Admin Dashboard</h2>

        <button onClick={logout}>
          Logout
        </button>
      </div>

      {/* Summary Cards */}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          Total Bookings: {summary.totalBookings}
        </div>

        <div className="dashboard-card">
          Confirmed: {summary.confirmedBookings}
        </div>

        <div className="dashboard-card">
          Enquired: {summary.enquiredBookings}
        </div>

        <div className="dashboard-card">
          Cancelled: {summary.cancelledBookings}
        </div>

        <div className="dashboard-card">
          Today: {summary.todayBookings}
        </div>

      </div>

      {/* Upcoming Bookings */}

      <h3>Upcoming Bookings</h3>

      <div className="table-wrapper">

        <table>

          <thead>
            <tr>
              <th>Customer</th>
              <th>Event Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {upcomingBookings.map((booking, index) => (

              <tr key={index}>
                <td>{booking.customerName}</td>
                <td>{booking.eventName}</td>
                <td>{booking.phoneNumber}</td>
                <td>{booking.eventDate}</td>
                <td>{booking.startTime}</td>
                <td>{booking.endTime}</td>
                <td>{booking.status}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Recent Enquiries */}

      <h3>Recent Enquiries</h3>

      <div className="table-wrapper">

        <table>

          <thead>
            <tr>
              <th>Customer</th>
              <th>Event Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Created At</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {recentEnquiries.map((enquiry, index) => (

              <tr key={index}>
                <td>{enquiry.customerName}</td>
                <td>{enquiry.eventName}</td>
                <td>{enquiry.phoneNumber}</td>
                <td>{enquiry.eventDate}</td>
                <td>{enquiry.createdAt}</td>
                <td>{enquiry.status}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;