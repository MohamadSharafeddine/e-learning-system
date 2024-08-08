import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">E-Learning System</div>
      <div className="navbar-links">
        {token ? (
          <>
            {userRole === "admin" ? (
              <>
                <Link to="/users">User List</Link>
                <Link to="/files/upload">Upload Files</Link>
                <Link to="/withdrawals/manage">Manage Withdrawals</Link>
                <Link to="/courses">Courses</Link>
                <Link to="/courses/new">Add/Edit Courses</Link>
              </>
            ) : (
              <>
                <Link to="/withdrawals/request">Withdrawal Request</Link>
              </>
            )}
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
