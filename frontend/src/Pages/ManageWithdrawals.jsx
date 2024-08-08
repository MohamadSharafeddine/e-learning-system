import React, { useState, useEffect } from "react";
import api from "../Api/api";
import "./ManageWithdrawals.css";

const ManageWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWithdrawals = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get("/withdrawals", {
          headers: { "x-auth-token": token },
        });
        setWithdrawals(response.data);
      } catch (error) {
        setMessage("Failed to fetch withdrawals");
        console.error("Failed to fetch withdrawals", error);
      }
    };

    fetchWithdrawals();
  }, []);

  const handleUpdateStatus = async (withdrawalId, status) => {
    const token = localStorage.getItem("token");
    try {
      await api.put(
        `/withdrawals/${withdrawalId}`,
        { status },
        {
          headers: { "x-auth-token": token },
        }
      );
      setWithdrawals(
        withdrawals.map((w) => (w._id === withdrawalId ? { ...w, status } : w))
      );
    } catch (error) {
      setMessage("Failed to update withdrawal status");
      console.error(`Failed to update status: ${error.message}`);
    }
  };

  return (
    <div className="manage-withdrawals-container">
      <h2>Manage Withdrawal Requests</h2>
      {message && <p className="withdrawal-message">{message}</p>}
      <ul className="withdrawal-list">
        {withdrawals.map(
          (withdrawal) =>
            withdrawal && (
              <li key={withdrawal._id} className="withdrawal-item">
                <p>User: {withdrawal.user?.name || "Unknown"}</p>
                <p>Course: {withdrawal.course?.title || "Unknown"}</p>
                <p>Status: {withdrawal.status}</p>
                <button
                  onClick={() => handleUpdateStatus(withdrawal._id, "Approved")}
                  className="approve-button"
                  disabled={withdrawal.status !== "Pending"}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleUpdateStatus(withdrawal._id, "Rejected")}
                  className="reject-button"
                  disabled={withdrawal.status !== "Pending"}
                >
                  Reject
                </button>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default ManageWithdrawals;
