import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./Home";
import CreateEnquiry from "./CreateEnquiry";
import Dashboard from "./Dashboard";
import Menus from "./Menus";
import BookingsList from "./BookingsList";

function App() {
  return (
    <Router>
      <div className="container">

        <h1 className="title">RMJ Hall Admin Panel</h1>

        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/create">Create Enquiry</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/menus">Menus</Link>
          <Link to="/bookings">Bookings</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEnquiry />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/bookings" element={<BookingsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
