import React, { useState, useEffect } from "react";
import api from "../Api/api";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        setMessage("Failed to fetch users");
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      {message && <p className="user-list-message">{message}</p>}
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id} className="user-item">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
