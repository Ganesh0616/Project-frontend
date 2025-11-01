// src/Pages/CheckoutPage.js
import React, { useContext, useState } from "react";
import { CartContext } from "../components/Context/CartContext";
import Navigation from "../components/common/Header";
import CheckStyles from "../Styles/Checkout.module.css";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, totalPrice, placeOrder } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return alert("Cart is empty!");
    setLoading(true);

    const result = await placeOrder();
    setLoading(false);

    if (result) {
      alert("✅ Order placed successfully!");
      navigate("/my-orders");
    } else {
      alert("❌ Failed to place order!");
    }
  };

  return (
    <>
      <Navigation />
      <div className={CheckStyles.checkoutContainer}>
        <h2>Checkout</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className={CheckStyles.itemsSummary}>
              <h3>Items in Cart</h3>
              {cartItems.map((item) => (
                <div key={item._id} className={CheckStyles.itemRow}>
                  <span>
                    {item.name} × {item.quantity || 1}
                  </span>
                  <span>₹{item.price * (item.quantity || 1)}</span>
                </div>
              ))}
              <h3>Total: ₹{totalPrice}</h3>
            </div>

            <button
              className={CheckStyles.placeOrderBtn}
              onClick={handlePlaceOrder}
              disabled={loading || cartItems.length === 0}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default CheckoutPage;
