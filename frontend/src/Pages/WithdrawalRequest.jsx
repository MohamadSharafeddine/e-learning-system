import React, { useState, useEffect } from "react";
import api from "../Api/api";
import "./WithdrawalRequest.css";

const WithdrawalRequest = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setMessage("User not logged in");
      return;
    }

    try {
      await api.post("/withdrawals", { userId, courseId: selectedCourse });
      setMessage("Withdrawal request submitted successfully");
    } catch (error) {
      setMessage("Failed to submit withdrawal request");
    }
  };

  return (
    <div className="withdrawal-container">
      <h2>Submit Withdrawal Request</h2>
      <form onSubmit={handleSubmit} className="withdrawal-form">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="withdrawal-select"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
        <button type="submit" className="withdrawal-button">
          Submit Request
        </button>
      </form>
      {message && <p className="withdrawal-message">{message}</p>}
    </div>
  );
};

export default WithdrawalRequest;
