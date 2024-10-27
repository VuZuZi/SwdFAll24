import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../assets/css/PostCss.css";

const PostAd = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    category: '',
    postType: 'cần bán', // Mặc định là 'cần bán'
    title: '',
    description: '',
    price: '',
    images: null, // Chỉ cần một hình ảnh
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files[0], // Chỉ lấy hình ảnh đầu tiên
    });

    setErrors({
      ...errors,
      images: ''
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Tên không được để trống!";
    }

    if (!formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ!";
    }

    if (!formData.email) {
      newErrors.email = "Email không được để trống!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Địa chỉ email không hợp lệ!";
    }

    if (!formData.address) {
      newErrors.address = "Địa chỉ không được để trống!";
    }

    if (!formData.category) {
      newErrors.category = "Chuyên mục không được để trống!";
    }

    if (!formData.title) {
      newErrors.title = "Tiêu đề không được để trống!";
    }

    if (!formData.description) {
      newErrors.description = "Nội dung không được để trống!";
    }

    if (!formData.price) {
      newErrors.price = "Giá không được để trống!";
    } else if (formData.price <= 0) {
      newErrors.price = "Giá phải lớn hơn 0!";
    }

    // Không cần kiểm tra trường hình ảnh
    // if (!formData.images) {
    //   newErrors.images = "Hình ảnh không được để trống!";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    const handleFileChange = (e) => {
      setFormData({
        ...formData,
        images: e.target.files[0], // Lưu hình ảnh đầu tiên từ danh sách
      });
    };

    try {
      const response = await axios.post('http://localhost:3006/post', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        category: '',
        postType: 'cần bán',
        title: '',
        description: '',
        price: '',
        images: null,
      });
    } catch (error) {
      console.error('Lỗi khi gửi bài đăng:', error);
    }
  };

  return (
    <div className="container-post">
      <div id="about">
        <div>
          <h2>Tạo bài viết mới</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Tên:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại:</label>
              <input
                type="phone-number"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Địa chỉ:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && <p className="error">{errors.address}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="category">Chuyên mục:</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Chọn chuyên mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="error">{errors.category}</p>}
            </div>

            <div className="form-group">
              <label>Bạn đăng tin:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="postType"
                    value="cần bán"
                    checked={formData.postType === 'cần bán'}
                    onChange={handleChange}
                  />
                  Cần bán
                </label>
                <label>
                  <input
                    type="radio"
                    name="postType"
                    value="cần mua"
                    checked={formData.postType === 'cần mua'}
                    onChange={handleChange}
                  />
                  Cần mua
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="title">Tiêu đề:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              {errors.title && <p className="error">{errors.title}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Nội dung:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                style={{ height: '150px' }}
              />
              {errors.description && <p className="error">{errors.description}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="price">Giá:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
              {errors.price && <p className="error">{errors.price}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="images">Hình ảnh:</label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleFileChange}
                required // Vẫn giữ yêu cầu cho ít nhất 1 hình ảnh
              />
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="images">Hình ảnh:</label>
              <input
              type="file"
              id="images"
              name="images"
              onChange={handleFileChange}
              accept="image/*"
            />
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleFileChange}
              />
            </div>

            <div className="button-container">
              <button type="submit" className="submit-button">Đăng Tin</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostAd;
