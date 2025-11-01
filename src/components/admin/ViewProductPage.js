// src/components/common/ViewProductPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../common/Header";
import ViewStyles from "../../Styles/ViewPage.module.css";

const ViewProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const token = localStorage.getItem("token");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!token) return alert("⚠️ You must be logged in as admin!");
        const res = await axios.get(
          "http://localhost:5000/PowerHouseFitHub/getproduct",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err.response?.data || err.message);
        alert("❌ Failed to fetch products. Make sure you are an admin.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [token]);

  // Delete a product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/PowerHouseFitHub/deleteProduct/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
      alert("✅ Product deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("❌ Failed to delete product.");
    }
  };

  // Start editing
  const startEdit = (product) => {
    setEditingProduct(product._id);
    setEditForm({ ...product });
  };

  // Handle input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // Save updated product
  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/PowerHouseFitHub/updateProduct/${editingProduct}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(products.map(p => p._id === editingProduct ? editForm : p));
      setEditingProduct(null);
      alert("✅ Product updated successfully!");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("❌ Failed to update product.");
    }
  };

  const cancelEdit = () => setEditingProduct(null);

  if (loading) return <p style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Loading products...</p>;

  return (
    <>
      <Navigation />
      <div className={ViewStyles.pageContainer}>
        <div className={ViewStyles.container}>
          <h1>View & Manage Products</h1>
          {products.length === 0 ? (
            <p style={{ color: "white", textAlign: "center", marginTop: "20px" }}>No products found.</p>
          ) : (
            <table className={ViewStyles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price (₹)</th>
                  <th>Size</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Weight</th>
                  <th>Gender</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>{editingProduct === p._id ? <input name="name" value={editForm.name} onChange={handleEditChange} /> : p.name}</td>
                    <td>{editingProduct === p._id ? <input name="price" value={editForm.price} onChange={handleEditChange} /> : p.price}</td>
                    <td>{editingProduct === p._id ? <input name="size" value={editForm.size} onChange={handleEditChange} /> : p.size}</td>
                    <td>{editingProduct === p._id ? <input name="description" value={editForm.description} onChange={handleEditChange} /> : p.description}</td>
                    <td>{editingProduct === p._id ? <input name="category" value={editForm.category.join(", ")} onChange={(e) => setEditForm({ ...editForm, category: e.target.value.split(",").map(c => c.trim()) })} /> : p.category.join(", ")}</td>
                    <td>{editingProduct === p._id ? <input name="weight" value={editForm.weight} onChange={handleEditChange} /> : p.weight}</td>
                    <td>{editingProduct === p._id ? <input name="gender" value={editForm.gender} onChange={handleEditChange} /> : p.gender}</td>
                    <td>{editingProduct === p._id ? <input name="stock" value={editForm.stock} onChange={handleEditChange} /> : p.stock}</td>
                    <td>
                      {editingProduct === p._id ? (
                        <>
                          <button className={ViewStyles.editBtn} onClick={saveEdit}>Save</button>
                          <button className={ViewStyles.cancelBtn} onClick={cancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className={ViewStyles.editBtn} onClick={() => startEdit(p)}>Edit</button>
                          <button className={ViewStyles.deleteBtn} onClick={() => handleDelete(p._id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewProductPage;
