  import React, { useContext } from "react";
  import { CartContext } from "../Context/CartContext";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  import OrderSumStyles from "../../Styles/OrderSummary.module.css";

  const OrderSummaryPage = () => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token"); // Added token

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );

    const handlePlaceOrder = async () => {
      if (!token) {
        alert("⚠️ Please login first!");  
        navigate("/login");
        return;
      }

      if (cartItems.length === 0) return alert("🛒 Cart is empty!");

      try {
        await axios.post(
          "http://localhost:5000/PowerHouseFitHub/placeOrder",
          {
            userName: user.username,
            products: cartItems,
            totalAmount,
            paymentMethod: "COD",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // send token for auth
            },
          }
        );

        alert("✅ Order placed successfully!");
        setCartItems([]);
        navigate("/products");
      } catch (err) {
        console.error("❌ Order Error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "❌ Failed to place order.");
      }
    };

    return (
      <div className={OrderSumStyles.orderContainer}>
        <h2 className={OrderSumStyles.orderTitle}>Order Summary</h2>
        <p className={OrderSumStyles.userInfo}>
          <strong>User:</strong> {user.username}
        </p>

        <div className={OrderSumStyles.tableContainer}>
          <table className={OrderSumStyles.table}>
            <thead>
              <tr>
                <th>Products</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className={OrderSumStyles.productList}>
                      <div className={OrderSumStyles.productListItem}>
                        <span>{item.name}</span>
                        <span className={OrderSumStyles.qtyBadge}>
                          x{item.quantity || 1}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity || 1}</td>
                  <td>₹{item.price * (item.quantity || 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className={OrderSumStyles.totalAmount}>
          Total Amount: ₹{totalAmount}
        </h3>

        <p className={OrderSumStyles.paymentInfo}>
          <strong>Payment Method:</strong> Cash on Delivery (COD)
        </p>

        <button
          className={OrderSumStyles.placeOrderBtn}
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    );
  };

  export default OrderSummaryPage;
