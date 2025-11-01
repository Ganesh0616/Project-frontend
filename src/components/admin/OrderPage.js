// src/Pages/OrderPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../common/Header";
import OrderStyles from "../../Styles/OrderPage.module.css";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/PowerHouseFitHub/myOrders",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err.response?.data || err.message);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <>
      <Navigation />
      <div className={OrderStyles.orderContainer}>
        <h2 className={OrderStyles.orderTitle}>My Orders</h2>

        {orders.length === 0 ? (
          <p className={OrderStyles.noOrders}>No orders yet.</p>
        ) : (
          <div className={OrderStyles.tableContainer}>
            <table className={OrderStyles.orderTable}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      {order.products.map((p, idx) => (
                        <div key={idx}>
                          {p.name} × {p.quantity || 1} (₹{p.price})
                        </div>
                      ))}
                    </td>
                    <td>₹{order.totalAmount}</td>
                    <td>{order.status}</td>
                    <td>{order.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderPage;
