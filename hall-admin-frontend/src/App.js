import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";

import Login from "./Login";
import CreateEnquiry from "./CreateEnquiry";
import Dashboard from "./Dashboard";
import BookingsList from "./BookingsList";

function Layout() {

  const location = useLocation();

  const loggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <div className="container">

      <h1 className="title">RMJ Hall Admin Panel</h1>

      {loggedIn && location.pathname !== "/" && (
        <nav className="navbar">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/create">Create Enquiry</Link>
          <Link to="/bookings">Confirmed Bookings</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateEnquiry />} />
        <Route path="/bookings" element={<BookingsList />} />
      </Routes>

    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;