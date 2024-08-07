import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Api/api";
import "./CourseForm.css";

const CourseForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      const fetchCourse = async () => {
        try {
          const response = await api.get(`/courses/${courseId}`);
          setTitle(response.data.title);
          setDescription(response.data.description);
        } catch (error) {
          console.error("Failed to fetch course", error);
        }
      };

      fetchCourse();
    }
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = { title, description };

    try {
      if (courseId) {
        await api.put(`/courses/${courseId}`, courseData);
      } else {
        await api.post("/courses", courseData);
      }
      navigate("/courses");
    } catch (error) {
      console.error("Failed to save course", error);
    }
  };

  return (
    <div className="courseform-container">
      <h2>{courseId ? "Edit Course" : "Add Course"}</h2>
      <form onSubmit={handleSubmit} className="courseform">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="courseform-input"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="courseform-input"
        />
        <button type="submit" className="courseform-button">
          {courseId ? "Update Course" : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
