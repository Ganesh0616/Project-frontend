// src/components/Context/CartContext.js
import React, { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Total price considering quantity
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (id) =>
    setCartItems(cartItems.filter((item) => item._id !== id));

  const increaseQty = (id) =>
    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );

  const decreaseQty = (id) =>
    setCartItems(
      cartItems.map((item) =>
        item._id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // New: Place order directly from context
  const placeOrder = async () => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (!username || cartItems.length === 0) return false;

    try {
      const response = await axios.post(
        "http://localhost:5000/PowerHouseFitHub/placeOrder",
        {
          userName: username,
          products: cartItems,
          totalAmount: totalPrice,
          paymentMethod: "COD" // COD-only
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setCartItems([]); // clear cart after successful order
      return response.data; // return message or order details
    } catch (err) {
      console.error("❌ Failed to place order:", err.response?.data || err.message);
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        cartCount,
        totalPrice,
        placeOrder, // expose placeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
