import React, { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "./api";

function BookingsList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get(getApiUrl("/bookings/all"))
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Event Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Guests</th>
              <th>Notes</th>
            </tr>
          </thead>

        <tbody>
          {bookings.map(b => (
            <tr key={b.bookingId}>
              <td>{b.bookingId}</td>
              <td>{b.customerName}</td>
              <td>{b.phoneNumber}</td>
              <td>{b.eventDate}</td>
              <td>{b.startTime}</td>
              <td>{b.endTime}</td>
              <td>{b.noOfGuests}</td>
              <td>{b.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default BookingsList;
