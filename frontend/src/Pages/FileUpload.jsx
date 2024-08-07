import React, { useState, useEffect } from "react";
import api from "../Api/api";
import "./FileUpload.css";

const FileUpload = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [file, setFile] = useState(null);
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("courseId", selectedCourse);

    try {
      await api.post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("File uploaded successfully");
    } catch (error) {
      setMessage("Failed to upload file");
    }
  };

  return (
    <div className="fileupload-container">
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit} className="fileupload-form">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="fileupload-select"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={handleFileChange}
          className="fileupload-input"
        />
        <button type="submit" className="fileupload-button">
          Upload
        </button>
      </form>
      {message && <p className="fileupload-message">{message}</p>}
    </div>
  );
};

export default FileUpload;
