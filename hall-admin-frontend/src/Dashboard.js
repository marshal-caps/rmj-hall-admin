import React, { useEffect, useState } from "react";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);

  useEffect(() => {
    // 1. Updated summary endpoint
    fetch(`${process.env.REACT_APP_API_URL}/dashboard/summary`)
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(err => console.error("Error fetching summary:", err));

    // 2. Updated upcoming bookings endpoint
    fetch(`${process.env.REACT_APP_API_URL}/dashboard/upcoming`)
      .then(res => res.json())
      .then(data => setUpcomingBookings(data))
      .catch(err => console.error("Error fetching upcoming bookings:", err));

    // 3. Updated recent enquiries endpoint
    fetch(`${process.env.REACT_APP_API_URL}/dashboard/recent-enquiries`)
      .then(res => res.json())
      .then(data => setRecentEnquiries(data))
      .catch(err => console.error("Error fetching recent enquiries:", err));
  }, []);

  if (!summary) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      {/* Summary Cards */}
      <div className="dashboard-cards">
        <div className="dashboard-card">Total Bookings: {summary.totalBookings}</div>
        <div className="dashboard-card">Confirmed: {summary.confirmedBookings}</div>
        <div className="dashboard-card">Enquired: {summary.enquiredBookings}</div>
        <div className="dashboard-card">Cancelled: {summary.cancelledBookings}</div>
        <div className="dashboard-card">Today: {summary.todayBookings}</div>
      </div>

      {/* Upcoming Bookings */}
      <h3>Upcoming Bookings</h3>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
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
              <td>{booking.eventDate}</td>
              <td>{booking.startTime}</td>
              <td>{booking.endTime}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Recent Enquiries */}
      <h3>Recent Enquiries</h3>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
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
              <td>{enquiry.phoneNumber}</td>
              <td>{enquiry.eventDate}</td>
              <td>{enquiry.createdAt}</td>
              <td>{enquiry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;