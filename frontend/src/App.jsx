import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import UserList from "./Pages/UserList";
import CourseList from "./Pages/CourseList";
import CourseForm from "./Pages/CourseForm";
import FileUpload from "./Pages/FileUpload";
import WithdrawalRequest from "./Pages/WithdrawalRequest";
import ManageWithdrawals from "./Pages/ManageWithdrawals";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/users"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <UserList />
                </PrivateRoute>
              }
            />
            <Route
              path="/files/upload"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <FileUpload />
                </PrivateRoute>
              }
            />
            <Route
              path="/withdrawals/manage"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <ManageWithdrawals />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <CourseList />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/new"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <CourseForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/edit/:courseId"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <CourseForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/withdrawals/request"
              element={
                <PrivateRoute allowedRoles={["user"]}>
                  <WithdrawalRequest />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
