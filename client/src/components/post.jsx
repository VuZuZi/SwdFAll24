import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../assets/css/PostCss.css";
import { storage } from "../components/FireBase/firebaseConfig";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";

import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

const PostAd = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const initialValues = {
    phone: "",
    email: "",
    location: "",
    category: {
      name: "",
      subcategories: "",
    },
    postedBy: "",
    title: "",
    description: "",
    price: "",
    images: [],
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^\d+$/, "Số điện thoại không hợp lệ!")
      .required("Số điện thoại không được để trống!"),
    email: Yup.string()
      .email("Địa chỉ email không hợp lệ!")
      .required("Email không được để trống!"),
    location: Yup.string().required("Địa chỉ không được để trống!"),
    category: Yup.object().shape({
      name: Yup.string().required("Chuyên mục không được để trống!"),
      subcategories: Yup.string().required("Phân loại không được để trống!"),
    }),
    title: Yup.string().required("Tiêu đề không được để trống!"),
    description: Yup.string().required("Nội dung không được để trống!"),
    price: Yup.number()
      .required("Giá không được để trống!")
      .positive("Giá phải lớn hơn 0!"),
  });

  const handleCategoryChange = (e, setFieldValue) => {
    const selected = e.target.value;

    setFieldValue("category.name", selected);
    setSelectedCategory(selected);
    const category = categories.find((cat) => cat.name === selected);
    console.log(category);

    if (category) {
      setSubcategories(category.subcategories);
    } else {
      setSubcategories([]);
    }
  };

  const handleCategorySubChange = (e, setFieldValue) => {
    const selected = e.target.value;
    setFieldValue("category.subcategories", selected);
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const imageUrls = await Promise.all(values.images.map(uploadImage));
      const adData = { ...values, images: imageUrls };
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      adData.postedBy = decoded.id_user;

      await axios.post("http://localhost:3000/ad/create", adData);
      resetForm();
    } catch (error) {
      console.error("Error posting ad:", error);
      alert("Đã xảy ra lỗi khi đăng tin.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-post">
      <div id="about">
        <div>
          <h2>Tạo bài viết mới</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="form-group">
                  <div className="flex-item-post">
                    <label htmlFor="title">Tiêu đề:</label>
                    <Field type="text" id="title" name="title" />
                  </div>
                  <ErrorMessage name="title" component="p" className="error" />
                </div>

                <div className="form-group">
                  <div className="flex-item-post">
                    <label htmlFor="phone">Số điện thoại:</label>
                    <Field type="text" id="phone" name="phone" />
                  </div>
                  <ErrorMessage name="phone" component="p" className="error" />
                </div>

                <div className="form-group">
                  <div className="flex-item-post">
                    <label htmlFor="email">Email:</label>
                    <Field type="email" id="email" name="email" />
                  </div>
                  <ErrorMessage name="email" component="p" className="error" />
                </div>

                <div className="form-group">
                  <div className="flex-item-post">
                    <label htmlFor="location">Địa chỉ:</label>
                    <Field type="text" id="location" name="location" />
                  </div>
                  <ErrorMessage
                    name="location"
                    component="p"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <div className="flex-item-post">
                    <label htmlFor="category">Chuyên mục:</label>
                    <Field
                      as="select"
                      id="category"
                      name="category.name"
                      onChange={(e) => handleCategoryChange(e, setFieldValue)}
                    >
                      <option value="">Chọn chuyên mục</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="category.name"
                    component="p"
                    className="error"
                  />
                </div>

                {selectedCategory && (
                  <div className="form-group">
                    <div className="flex-item-post">
                      <label htmlFor="subcategories">Phân loại:</label>
                      <Field
                        as="select"
                        id="subcategories"
                        name="category.subcategories"
                        onChange={(e) =>
                          handleCategorySubChange(e, setFieldValue)
                        }
                      >
                        <option value="">Chọn phân loại</option>
                        {subcategories && subcategories.length > 0 ? (
                          subcategories.map((sub, subIndex) => (
                            <option key={subIndex} value={sub}>
                              {sub}
                            </option>
                          ))
                        ) : (
                          <option value="">Không có phân loại nào</option>
                        )}
                      </Field>
                    </div>
                    <ErrorMessage
                      name="category.subcategories"
                      component="p"
                      className="error"
                    />
                  </div>
                )}

                <div className="form-group">
                  <div className="flex-item-post">
                    <label htmlFor="description">Nội dung:</label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      style={{ height: "150px" }}
                    />
                  </div>

                  <ErrorMessage
                    name="description"
                    component="p"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <div className="flex-item-post">
                    <label htmlFor="price">Giá:</label>
                    <Field type="number" id="price" name="price" />
                  </div>
                  <ErrorMessage name="price" component="p" className="error" />
                </div>

                <div className="form-group">
                  <div className="flex-item-post">
                    <label htmlFor="images">Chọn ảnh:</label>
                    <input
                      type="file"
                      id="images"
                      name="images"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setFieldValue("images", files);
                      }}
                    />
                  </div>
                </div>

                <div className="button-container">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Đang xử lý..." : "Đăng Tin"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default PostAd;
