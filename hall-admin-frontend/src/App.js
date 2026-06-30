import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./Login";

import Home from "./Home";
import CreateEnquiry from "./CreateEnquiry";
import Dashboard from "./Dashboard";
import BookingsList from "./BookingsList";

function App() {
  return (
    <Router>
      <div className="container">

        <h1 className="title">RMJ Hall Admin Panel</h1>

        <nav className="navbar">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/create">Create Enquiry</Link>
          <Link to="/">Search Bookings</Link>
          <Link to="/bookings">Confirmed Bookings</Link>
        </nav>

        <Routes>
    <Route path="/" element={<Login />} />

    <Route path="/dashboard" element={<Dashboard />} />

    <Route path="/bookings" element={<BookingsList />} />

    <Route path="/create" element={<CreateEnquiry />} />
</Routes>
      </div>
    </Router>
  );
}



export default App;
