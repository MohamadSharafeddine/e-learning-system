import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navList">
        <li className="navItem">
          <Link to="/register">Register</Link>
        </li>
        <li className="navItem">
          <Link to="/login">Login</Link>
        </li>
        <li className="navItem">
          <Link to="/users">User List</Link>
        </li>
        <li className="navItem">
          <Link to="/courses">Courses</Link>
        </li>
        <li className="navItem">
          <Link to="/courses/new">Add Course</Link>
        </li>
        <li className="navItem">
          <Link to="/files/upload">Upload File</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
