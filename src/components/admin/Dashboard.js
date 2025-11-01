// src/components/Admin/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "../../Styles/Dashboard.module.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const productsRes = await axios.get("http://localhost:5000/PowerHouseFitHub/getproduct", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductCount(productsRes.data.length);

        const ordersRes = await axios.get("http://localhost:5000/PowerHouseFitHub/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrderCount(ordersRes.data.length);
      } catch (err) {
        console.error("❌ Error fetching counts:", err);
      }
    };
    fetchCounts();
  }, [token]);

  return (
    <div className={Styles.dashboardContainer}>
      <h1 className={Styles.title}>🧑‍💼 Admin Dashboard</h1>

      <div className={Styles.cardsContainer}>
        <div
          className={Styles.card}
          onClick={() => navigate("/admin/view-products")}
        >
          View Products
          <span className={Styles.badge}>{productCount}</span>
        </div>

        <div
          className={Styles.card}
          onClick={() => navigate("/admin/add-product")}
        >
          Add New Product
        </div>

        <div
          className={Styles.card}
          onClick={() => navigate("/admin/orders")}
        >
          Manage Orders
          <span className={Styles.badge}>{orderCount}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
