import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick"; // Import thư viện slide
import "../assets/css/ProductDetails.css";
import { jwtDecode } from "jwt-decode";

const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/ad/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details: ", error);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id_user);
    }
  }, []);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <h2>Chi Tiết Sản Phẩm</h2>
      <div className="product-detail-content">
        {/* Slider ảnh */}
        <div className="product-detail-img">
          <Slider {...sliderSettings}>
            {product.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="product-detail-image"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Thông tin chi tiết sản phẩm */}
        <div className="product-detail-info">
          <h3>{product.title}</h3>
          <p>Giá Tiền: {formatPrice(product.price)} VND</p>
          <p>Chi Tiết: {product.description}</p>
          <p>Địa Điểm: {product.location}</p>
          <p>
            Người Đăng: {product.postedBy.first_name}{" "}
            {product.postedBy.last_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
