// src/components/Category.jsx
import React, { useEffect, useState } from "react";
import "../assets/css/SearchCss.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export const Category = () => {
  const [ads, setAds] = useState([]);
  const [numberOfDisplayedProducts, setNumberOfDisplayedProducts] = useState(9);
  const [provinces, setProvinces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get("http://localhost:3000/province");

        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    fetchProvinces();
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await axios.get("http://localhost:3000/ad/");

      setAds(response.data);
      console.log("ads:", response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearchClick = () => {
    const query = {
      keyword: searchKeyword,
      category: selectedCategory,
      address: selectedAddress,
      subcategories: selectedSubcategory,
    };
    setSelectedSubcategory("");
    axios
      .get("http://localhost:3000/ad/", { params: query })
      .then((res) => setAds(res.data))
      .catch((error) => console.error("Lỗi khi tìm kiếm:", error));
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    const parentCategory = categories.find((category) =>
      category.subcategories.includes(subcategory)
    );

    parentCategory.name
      ? setSelectedCategory(parentCategory.name)
      : setSelectedCategory("");
      setSearchKeyword("");
  };

  useEffect(() => {
    if (selectedSubcategory) {
      handleSearchClick();
    }
  }, [selectedSubcategory]);

  const loadMoreProducts = () => {
    const newNumberOfDisplayedProducts = numberOfDisplayedProducts + 9;
    setNumberOfDisplayedProducts(newNumberOfDisplayedProducts);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div id="category" className="text-center" style={{ paddingTop: "150px" }}>
      <div className="container-form-search">
        <div className="flex-category">
          <ul className="list-unstyled category-list">
            {categories.map((category, index) => (
              <li key={index}>
                <a
                  className="toggle-btn collapsed"
                  data-bs-toggle="collapse"
                  href={`#collapse${category.name.replace(/\s+/g, "")}`}
                  role="button"
                  aria-expanded="false"
                  aria-controls={`collapse${category.name.replace(/\s+/g, "")}`}
                >
                  {category.name}
                </a>
                <ul
                  className="sub-list collapse"
                  id={`collapse${category.name.replace(/\s+/g, "")}`}
                >
                  {category.subcategories.map((sub, subIndex) => (
                    <li key={subIndex}>
                      <a
                        onClick={() => handleSubcategoryClick(sub)}
                      >{`+ ${sub}`}</a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
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
              <select
                id="product-select"
                style={{ marginRight: "10px" }}
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
              >
                <option value="">Chọn sản phẩm</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                id="address-select"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                <option value="">Chọn địa chỉ</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-danger"
                onClick={handleSearchClick}
                style={{ marginLeft: "10px" }}
              >
                Tìm
              </button>
            </div>
          </div>

          {ads.length === 0 && (
            <div className="no-results">Không có tin rao vặt phù hợp.</div>
          )}
          <div className="item-search">
            {ads.map((product) => (
              <div className="item-detail-search" key={product._id}>
                <div className="portfolio-items product-item">
                  <img src={product.images[0]} alt={product.title} />
                  <div className="col-gap">
                    <h3 className="text-left" style={{ margin: "0" }}>
                      {product.title}
                    </h3>
                    <p className="text-left" style={{ margin: "0" }}>
                      Giá: {formatPrice(product.price)} VND
                    </p>
                    <div className="button-container-category">
                      <p className="text-left" style={{ margin: "0" }}>
                        Ở {product.location}
                      </p>

                      <Link to={`/productdetail/${product._id}`}>
                        <button className="addToCard">
                          <FontAwesomeIcon icon={faCircleInfo} />
                        </button>
                      </Link>
                      <span style={{ margin: "0", alignSelf: "center" }}>
                        {formatDistanceToNow(new Date(product.createdAt), {
                          addSuffix: true,
                        })}{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <hr></hr>
              </div>
            ))}
          </div>
          {numberOfDisplayedProducts < ads.length && (
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
