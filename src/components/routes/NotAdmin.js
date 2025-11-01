// src/components/common/NotAdmin.js
import React from "react";
import { useNavigate } from "react-router-dom";

const NotAdmin = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/products"); // Redirect to home page
  };

  return (
    <div className="notAdminContainer">
      <h1>🚫 Access Denied</h1>
      <p>You are not an admin!</p>
      <button className="goHomeBtn" onClick={handleRedirect}>
        Go to Home
      </button>

      {/* Internal CSS */}
      <style>{`
        .notAdminContainer {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #111;
          color: crimson;
          font-family: Verdana, sans-serif;
          text-align: center;
          padding: 1rem;
        }

        .notAdminContainer h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .notAdminContainer p {
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }

        .goHomeBtn {
          padding: 12px 24px;
          font-size: 1rem;
          font-weight: 600;
          background-color: crimson;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .goHomeBtn:hover {
          background-color: #ff4d4d;
        }
      `}</style>
    </div>
  );
};

export default NotAdmin;
