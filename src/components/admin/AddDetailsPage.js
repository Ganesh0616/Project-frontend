// src/components/admin/AddDetailsPage.js
import React, { useState } from "react";
import axios from "axios";
import AddDetailStyles from "../../Styles/AddDetails.module.css";

const AddDetailsPage = () => {
  const [formData, setFormData] = useState({
    pname: "", price: "", size: "", description: "", category: [], weight: "", gender: "", stock: ""
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData( (prev) => ({
        ...prev,
        [name]: checked ? [...prev[name], value] : prev[name].filter((v) => v !== value)
      }));
    } else {
      setFormData((prev)=>({ ...prev, [name]: value }))  ;
    }
  };  

  const handleFileChange = e => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pname || !formData.price || !formData.description || formData.category.length === 0 || !formData.weight || !formData.stock || !file) {
      alert("Please fill all required fields and upload image.");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("name", formData.pname);
    data.append("price", Number(formData.price));
    data.append("size", formData.size);
    data.append("description", formData.description);
    data.append("weight", formData.weight);
    data.append("gender", formData.gender);
    data.append("stock", formData.stock);
    formData.category.forEach(cat => data.append("category", cat));

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/PowerHouseFitHub/addProducts",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Product added successfully!");
      setFormData({ pname:"", price:"", size:"", description:"", category:[], weight:"", gender:"", stock:"" });
      setFile(null);
    } catch (err) {
      console.error("❌ Upload Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "❌ Failed to add product.");
    }
  };

  return (
    <div className={AddDetailStyles.pageContainer}>
      <div className={AddDetailStyles.container}>
        <h1 className={AddDetailStyles.pageTitle}>Add Product Details</h1>

        <form onSubmit={handleSubmit} className={AddDetailStyles.form}>
          <div className={AddDetailStyles.formGroup}>
            <label>Product Name*</label>
            <input type="text" name="pname" value={formData.pname} onChange={handleChange} className={AddDetailStyles.input} />
          </div>

          <div className={AddDetailStyles.formGroup}>
            <label>Product Image*</label>
            <input type="file" name="file" onChange={handleFileChange} className={AddDetailStyles.input} />
          </div>

          <div className={AddDetailStyles.formGroup}>
            <label>Price*</label>
            <input type="text" name="price" value={formData.price} onChange={handleChange} className={AddDetailStyles.input} />
          </div>

          <div className={AddDetailStyles.formGroup}>
            <label>Size</label>
            <div className={AddDetailStyles.radioGroup}>
              {["S","M","L","XL","XXL","Nil"].map(s => (
                <label key={s}>
                  <input type="radio" name="size" value={s} checked={formData.size===s} onChange={handleChange} /> {s}
                </label>
              ))}
            </div>
          </div>

          <div className={AddDetailStyles.formGroup}>
            <label>Description*</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className={AddDetailStyles.textarea}></textarea>
          </div>

          <div className={AddDetailStyles.formGroup}>
            <label>Category*</label>
            <div className={AddDetailStyles.checkboxGroup}>
              {["Supplements","Equipments","Accessories","Active Wears"].map(cat => (
                <label key={cat}>
                  <input type="checkbox" name="category" value={cat} checked={formData.category.includes(cat)} onChange={handleChange} /> {cat}
                </label>
              ))}
            </div>
          </div>

          <div className={AddDetailStyles.formGroup}>
            <label>Weight*</label>
            <div className={AddDetailStyles.radioGroup}>
              {["1/2kg","1kg","2kg","Nil"].map((w) => (
                <label key={w}>
                  <input type="radio" name="weight" value={w} checked={formData.weight===w} onChange={handleChange} /> {w}
                </label>
              ))}
            </div>
          </div>

          <div className={AddDetailStyles.formGroup}>
            <label>Gender</label>
            <div className={AddDetailStyles.radioGroup}>
              {["Male","Female","Unisex","Nil"].map(g => (
                <label key={g}>
                  <input type="radio" name="gender" value={g} checked={formData.gender===g} onChange={handleChange} /> {g}
                </label>
              ))}
            </div>
          </div>

          <div className={AddDetailStyles.formGroup}>
            <label>Stock*</label>
            <div className={AddDetailStyles.radioGroup}>
              {["In Stock","Out of Stock"].map(s => (
                <label key={s}>
                  <input type="radio" name="stock" value={s} checked={formData.stock===s} onChange={handleChange} /> {s}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className={AddDetailStyles.submitBtn}>Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddDetailsPage;
