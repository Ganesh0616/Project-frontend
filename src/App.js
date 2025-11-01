// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import GetStarted from "./components/common/GetStarted";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProductList from "./components/products/ProductList";
import ProductDetail from "./components/products/ProductDetail";
import CartPage from "./components/cart/CartPage";
import CheckoutPage from "./components/Checkout";
import OrdersPage from "./components/admin/OrderPage"; // User order history
import OrderSummaryPage from "./components/admin/Ordersummary";
import ViewProductPage from "./components/admin/ViewProductPage";
import AddDetailsPage from "./components/admin/AddDetailsPage";
import AdminDashboard from "./components/admin/Dashboard";
import AdminOrderPage from "./components/admin/AdminOrder";
import NotAdmin from "./components/routes/NotAdmin";

// Common pages
import About from "./components/common/About";
import DietChart from "./components/common/FreeDietChart";

// Route Guards
import ProtectedRoute from "./components/routes/ProtectedRoutes";
import AdminRoute from "./components/routes/AdminRoute";

// Context
import { CartProvider } from "./components/Context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* 🌍 Public Routes */}
          <Route path="/" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/about" element={<About />} />
          <Route path="/getproduct/:id" element={<ProductDetail />} />
          <Route path="/diet-chart" element={<DietChart />} />
          {/* 🛒 User-Protected Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-summary"
            element={
              <ProtectedRoute>
                <OrderSummaryPage />
              </ProtectedRoute>
            }
          />

          {/* 🧑‍💼 Admin-Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/view-products"
            element={
              <AdminRoute>
                <ViewProductPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <AdminRoute>
                <AddDetailsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrderPage />
              </AdminRoute>
            }
          />

          {/* 🚫 Not Admin */}
          <Route path="/notadmin" element={<NotAdmin />} />

          {/* 🔁 Fallback Route */}
          <Route path="*" element={<GetStarted />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
