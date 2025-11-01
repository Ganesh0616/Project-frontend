import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../common/Header";
import { CartContext } from "../Context/CartContext";
import DetailStyles from "../../Styles/ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/PowerHouseFitHub/getsingle/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className={DetailStyles.loading}>Loading product details...</p>;

  return (
    <>
      <Navigation />
      <div className={DetailStyles.detailContainer}>
        <div className={DetailStyles.imageWrapper}>
          <img
            src={product.imageurl || "https://via.placeholder.com/400"}
            alt={product.name}
            className={DetailStyles.image}
          />
        </div>

        <div className={DetailStyles.info}>
          <h2 className={DetailStyles.name}>{product.name}</h2>
          <p className={DetailStyles.price}>₹{product.price}</p>
          <p className={DetailStyles.description}>{product.description}</p>
          <p><strong>Category:</strong> {Array.isArray(product.category) ? product.category.join(", ") : product.category || "N/A"}</p>
          {product.size && <p><strong>Size:</strong> {product.size}</p>}
          {product.gender && <p><strong>Gender:</strong> {product.gender}</p>}
          <p><strong>Stock:</strong> {product.stock}</p>

          <div className={DetailStyles.buttonGroup}>
            <button
              className={DetailStyles.addToCart}
              disabled={product.stock <= 0}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <button
              className={DetailStyles.buyNow}
              disabled={product.stock <= 0}
              onClick={() => {
                addToCart({ ...product, quantity: 1 });
                navigate("/checkout");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
