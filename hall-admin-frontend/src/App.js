import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Home from "./Home";
import CreateEnquiry from "./CreateEnquiry";
import BookingsList from "./BookingsList";

function Layout() {

  const location = useLocation();

  const loggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <div className="container">

      <h1 className="title">RMJ Hall Admin Panel</h1>

      {/* Show navbar only after login */}
      {loggedIn && location.pathname !== "/" && (

        <nav className="navbar">

          <Link to="/dashboard">Dashboard</Link>

          <Link to="/search">Search Bookings</Link>

          <Link to="/create">Create Enquiry</Link>

          <Link to="/bookings">Confirmed Bookings</Link>

        </nav>

      )}

      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Search Bookings */}
        <Route path="/search" element={<Home />} />

        {/* Create Enquiry */}
        <Route path="/create" element={<CreateEnquiry />} />

        {/* Confirmed Bookings */}
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