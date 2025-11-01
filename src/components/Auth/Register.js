// src/components/Auth/Register.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterStyles from "../../Styles/Login.module.css"; // same CSS as login

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Route protection: redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/products"); // redirect logged-in users
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/PowerHouseFitHub/register",
        { username: form.username, password: form.password }
      );
      alert(res.data.message || "Registered successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={RegisterStyles.bg}>
      <h1 className={RegisterStyles.main}>Create Account</h1>
      <div className={RegisterStyles.card}>
        <form className={RegisterStyles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            className={RegisterStyles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={RegisterStyles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className={RegisterStyles.input}
            required
          />
          {error && <p className={RegisterStyles.error}>{error}</p>}
          <button type="submit" className={RegisterStyles.loginButton}>
            Register
          </button>
        </form>

        {/* Footer: Login link */}
        <p className={RegisterStyles.footerText}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
