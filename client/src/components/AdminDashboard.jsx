import React from "react"
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  if (!window.localStorage.token) {
    navigate("/")
  }

  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard