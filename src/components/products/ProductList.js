import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "../common/Header";
import ListStyles from "../../Styles/ProductList.module.css";
import { CartContext } from "../Context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mainCategory, setMainCategory] = useState("All");
  const [subFilter, setSubFilter] = useState("");
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/PowerHouseFitHub/getproduct"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const handleProductClick = (id) => navigate(`/getproduct/${id}`);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const subFiltersOptions = {
    Supplements: ["1/2kg", "1kg", "2kg"],
    "Active Wears": [
      "Male-S",
      "Male-M",
      "Male-L",
      "Male-XL",
      "Male-XXL",
      "Female-S",
      "Female-M",
      "Female-L",
      "Female-XL",
      "Female-XXL",
    ],
  };

  const filteredProducts = products.filter((product) => {
    const categories = Array.isArray(product.category)
      ? product.category
      : [product.category];
    const matchCategory =
      mainCategory === "All" ||
      categories.some(
        (cat) => cat?.toLowerCase() === mainCategory.toLowerCase()
      );
    let matchSubFilter = true;
    if (subFilter) {
      if (mainCategory === "Supplements")
        matchSubFilter = product.weight === subFilter;
      else if (mainCategory === "Active Wears")
        matchSubFilter = `${product.gender}-${product.size}` === subFilter;
    }
    const matchSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSubFilter && matchSearch;
  });

  return (
    <>
      <Navigation />
      <div className={ListStyles.productPageContainer}>
        <div className={ListStyles.searchFilterContainer}>
          <div className={ListStyles.filterGroup}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={ListStyles.searchInput}
            />

            <select
              value={mainCategory}
              onChange={(e) => {
                setMainCategory(e.target.value);
                setSubFilter("");
              }}
              className={ListStyles.filterSelect}
            >
              <option value="All">All Categories</option>
              <option value="Supplements">Supplements</option>
              <option value="Active Wears">Active Wears</option>
              <option value="Equipments">Equipments</option>
              <option value="Accessories">Accessories</option>
            </select>

            {subFiltersOptions[mainCategory] && (
              <select
                value={subFilter}
                onChange={(e) => setSubFilter(e.target.value)}
                className={ListStyles.filterSelect}
              >
                <option value="">All</option>
                {subFiltersOptions[mainCategory].map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button className={ListStyles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className={ListStyles.productGridContainer}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className={ListStyles.productcard}
                onClick={() => handleProductClick(product._id)}
              >
                <div className={ListStyles.productimagewrapper}>
                  <img
                    src={product.imageurl || "https://via.placeholder.com/200"}
                    alt={product.name}
                    className={ListStyles.productimage}
                  />
                </div>

                <div className={ListStyles.productInfo}>
                  <h3 className={ListStyles.productname}>{product.name}</h3>
                  <p className={ListStyles.productprice}>₹{product.price}</p>
                  <p className={ListStyles.productcategory}>
                    Category:{" "}
                    {Array.isArray(product.category)
                      ? product.category.join(", ")
                      : product.category || "N/A"}
                  </p>

                  <div className={ListStyles.buttonContainer}>
                    <button
                      className={ListStyles.cart}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={ListStyles.noProducts}>No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
