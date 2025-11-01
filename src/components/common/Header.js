// src/components/common/Header.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import Headstyles from "../../Styles/Header.module.css";

const Header = () => {
  const { cartCount } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className={Headstyles.headNavbar}>
      <div className={Headstyles.headNavLogo}>PowerHouse FitHub</div>
      <ul className={Headstyles.headNavLinks}>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/diet-chart">Free Diet Chart</Link></li>
        {user && user.role !== 'admin'&& (
          <li><Link to="/my-orders">My Orders</Link></li>
        )}
        
        {user?.role === "admin" && (
          <>
            <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
            <li><Link to="/admin/orders">Admin Orders</Link></li>
          </>
        )}
      </ul>
      <div className={Headstyles.headNavCart}>
        <Link to="/cart">🛒 Cart ({cartCount})</Link>
      </div>
    </nav>
  );
};

export default Header;
