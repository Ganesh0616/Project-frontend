// src/components/Auth/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loginstyles from "../../Styles/Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
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
    try {
      const res = await axios.post(
        "http://localhost:5000/PowerHouseFitHub/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("username", res.data.user.username);
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className={Loginstyles.bg}>
      <h1 className={Loginstyles.main}>Welcome Back!</h1>
      <div className={Loginstyles.card}>
        <form className={Loginstyles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            className={Loginstyles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={Loginstyles.input}
            required
          />
          {error && <p className={Loginstyles.error}>{error}</p>}
          <button type="submit" className={Loginstyles.loginButton}>
            Login
          </button>
        </form>

        {/* Footer: Register link */}
        <p className={Loginstyles.footerText}>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Register here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
