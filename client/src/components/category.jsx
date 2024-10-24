// src/components/Category.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import "../assets/css/SearchCss.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useHistory, Link } from "react-router-dom";
import { addToCart, setCartItems } from "../utils/cartSlice";

export const Category = () => {
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [numberOfDisplayedProducts, setNumberOfDisplayedProducts] = useState(9);
  const [noResults, setNoResults] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id_user);
      setRole(decodedToken.role);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      try {
        const parsedCartItems = JSON.parse(cartItems);
        dispatch(setCartItems(parsedCartItems));
      } catch (error) {
        console.error("Error parsing cart items: ", error);
      }
    }
  }, [dispatch]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product/");
      setProducts(response.data);
      filterProducts(response.data, searchKeyword);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const filterProducts = (allProducts, keyword) => {
    let filteredProducts = allProducts;
    if (keyword) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    setDisplayedProducts(filteredProducts.slice(0, numberOfDisplayedProducts));
    setNoResults(filteredProducts.length === 0);
  };

  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  useEffect(() => {
    filterProducts(products, searchKeyword);
  }, [searchKeyword, products]);

  const loadMoreProducts = () => {
    const newNumberOfDisplayedProducts = numberOfDisplayedProducts + 9;
    setNumberOfDisplayedProducts(newNumberOfDisplayedProducts);
    setDisplayedProducts(products.slice(0, newNumberOfDisplayedProducts));
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div id="category" className="text-center" style={{ paddingTop: "150px" }}>
      <div className="container-form-search">
        <div className="flex-category">
          <ul class="list-unstyled category-list">
            <li>
              <a
                class="toggle-btn collapsed"
                data-bs-toggle="collapse"
                href="#collapseXeCo"
                role="button"
                aria-expanded="false"
                aria-controls="collapseXeCo"
              >
                Xe cộ
              </a>
              <ul class="sub-list collapse" id="collapseXeCo">
                <li>
                  <a href="#">+ Xe máy</a>
                </li>
                <li>
                  <a href="#">+ Ô tô</a>
                </li>
                <li>
                  <a href="#">+ Xe đạp</a>
                </li>
                <li>
                  <a href="#">+ Xe tải, Xe khách</a>
                </li>
                <li>
                  <a href="#">+ Phụ tùng, linh kiện</a>
                </li>
              </ul>
            </li>

            <li>
              <a
                class="toggle-btn collapsed"
                data-bs-toggle="collapse"
                href="#collapseBatDongSan"
                role="button"
                aria-expanded="false"
                aria-controls="collapseBatDongSan"
              >
                Bất động sản
              </a>
              <ul class="sub-list collapse" id="collapseBatDongSan">
                <li>
                  <a href="#">+ Nhà đất</a>
                </li>
                <li>
                  <a href="#">+ Căn hộ</a>
                </li>
                <li>
                  <a href="#">+ Văn phòng</a>
                </li>
              </ul>
            </li>

            <li>
              <a
                class="toggle-btn collapsed"
                data-bs-toggle="collapse"
                href="#collapseDienTu"
                role="button"
                aria-expanded="false"
                aria-controls="collapseDienTu"
              >
                Đồ điện tử
              </a>
              <ul class="sub-list collapse" id="collapseDienTu">
                <li>
                  <a href="#">+ Điện thoại</a>
                </li>
                <li>
                  <a href="#">+ Máy tính</a>
                </li>
                <li>
                  <a href="#">+ TV</a>
                </li>
              </ul>
            </li>

            <li>
              <a
                class="toggle-btn collapsed"
                data-bs-toggle="collapse"
                href="#collapseThoiTrang"
                role="button"
                aria-expanded="false"
                aria-controls="collapseThoiTrang"
              >
                Thời trang
              </a>
              <ul class="sub-list collapse" id="collapseThoiTrang">
                <li>
                  <a href="#">+ Áo Quần</a>
                </li>
                <li>
                  <a href="#">+ Đầm cưới</a>
                </li>
                <li>
                  <a href="#">+ Trang sức</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="item-container">
          <div className="sticky-header">
            <div style={{ marginBottom: "8px" }}>
              <h2 style={{ margin: "0", fontSize: "26px" }}>Tin đăng mới</h2>
            </div>
            <div
              style={{ display: "flex", gap: "16px" }}
              className="search-container"
            >
              <input
                type="text"
                id="search-bar"
                style={{ width: "275px" }}
                value={searchKeyword}
                onChange={handleSearchInputChange}
                placeholder="Tìm kiếm theo từ khóa"
              />
              <select id="product-select" style={{ marginRight: "10px" }}>
                <option value="">Chọn sản phẩm</option>
                <option value="product1">Sản phẩm 1</option>
                <option value="product2">Sản phẩm 2</option>
                <option value="product3">Sản phẩm 3</option>
              </select>

              <select id="address-select">
                <option value="">Chọn địa chỉ</option>
                <option value="address1">Địa chỉ 1</option>
                <option value="address2">Địa chỉ 2</option>
                <option value="address3">Địa chỉ 3</option>
              </select>
              <button
                className="btn btn-danger"
                // onClick={handlePostAd}
                style={{ marginLeft: "10px" }}
              >
                Tìm
              </button>
            </div>
          </div>

          {noResults && (
            <div className="no-results">Không có tin rao vặt phù hợp.</div>
          )}
          <div className="item-search">
            {displayedProducts.map((product) => (
              <div className="item-detail-search" key={product._id}>
                <div className="portfolio-items product-item">
                  <img src={product.image} alt="" />
                  <div className="col-gap">
                    <h3 className="text-left" style={{ margin: "0" }}>
                      {product.name}
                    </h3>
                    {/* <p>{formatPrice(product.price)} VND</p> */}
                    <p className="text-left" style={{ margin: "0" }}>
                      {formatPrice(product.price)} VND
                    </p>
                    <div className="button-container-category">
                      <p className="text-left" style={{ margin: "0" }}>
                        Ở Hà Nội
                      </p>

                      <Link to={`/productdetail/${product._id}`}>
                        <button className="addToCard">
                          <FontAwesomeIcon icon={faCircleInfo} />
                        </button>
                      </Link>
                      <span style={{ margin: "0", alignSelf: "center" }}>
                        3 phút
                      </span>
                    </div>
                  </div>
                </div>
                <hr></hr>
              </div>
            ))}
          </div>
          {numberOfDisplayedProducts < products.length && (
            <div className="btn-load-more">
              <button onClick={loadMoreProducts} className="button-load-more">
                Xem Thêm
              </button>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Category;
