// src/components/Pages/CartPage.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import Navigation from "../common/Header";
import CartStyles from "../../Styles/CartPage.module.css";

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }
    navigate("/checkout"); // COD checkout page
  };

  return (
    <>
      <Navigation />
      <div className={CartStyles.cartContainer}>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className={CartStyles.cartGrid}>
              {cartItems.map((item) => (
                <div key={item._id} className={CartStyles.cartItem}>
                  <img src={item.imageurl} alt={item.name} />
                  <div className={CartStyles.cartInfo}>
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                    <div className={CartStyles.qtyControls}>
                      <button onClick={() => decreaseQty(item._id)}>-</button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => increaseQty(item._id)}>+</button>
                    </div>
                    <button
                      className={CartStyles.removeBtn}
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className={CartStyles.cartTotal}>
              <h3>Total: ₹{totalPrice}</h3>
            </div>
            <button className={CartStyles.checkoutBtn} onClick={handleCheckout}>
              Continue to Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
