// src/components/admin/AdminOrderPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../common/Header";
import Styles from "../../Styles/AdminOrder.module.css";

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/PowerHouseFitHub/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [token]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/PowerHouseFitHub/orders/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(orders.map(o => (o._id === id ? { ...o, status } : o)));
    } catch (err) {
      console.error("❌ Error updating status:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/PowerHouseFitHub/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter(o => o._id !== id));
    } catch (err) {
      console.error("❌ Error deleting order:", err);
    }
  };

  return (
    <>
      <Navigation />
      <div className={Styles.container}>
        <h1>Admin Orders</h1>
        <table className={Styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userName}</td>
                <td>
                  {order.products.map((p, idx) => (
                    <div key={idx}>{p.name} x {p.quantity || 1}</div>
                  ))}
                </td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <span
                    className={
                      order.status === "pending"
                        ? Styles.pendingStatus
                        : Styles.completedStatus
                    }
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.status === "pending" && (
                    <button
                      className={Styles.completeBtn}
                      onClick={() => handleStatusChange(order._id, "completed")}
                    >
                      Mark Completed
                    </button>
                  )}
                  <button
                    className={Styles.deleteBtn}
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminOrderPage;
