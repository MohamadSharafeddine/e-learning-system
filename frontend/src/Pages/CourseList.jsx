import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../Api/api";
import "./CourseList.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

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

  const handleDelete = async (courseId) => {
    try {
      await api.delete(`/courses/${courseId}`);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Failed to delete course", error);
    }
  };

  return (
    <div className="courselist-container">
      <h2>Course List</h2>
      <Link to="/courses/new" className="add-course-button">
        Add Course
      </Link>
      <ul className="courselist">
        {courses.map((course) => (
          <li key={course._id} className="courselist-item">
            {course.title} - {course.description}
            <button
              onClick={() => handleDelete(course._id)}
              className="delete-button"
            >
              Delete
            </button>
            <Link to={`/courses/edit/${course._id}`} className="edit-button">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
