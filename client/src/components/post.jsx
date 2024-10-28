import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../assets/css/PostCss.css";
import * as Yup from "yup";

const PostAd = () => {
  const [categories, setCategories] = useState([]);

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
    name: "",
    phone: "",
    email: "",
    address: "",
    category: "",
    title: "",
    description: "",
    price: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Tên không được để trống!"),
    phone: Yup.string()
      .matches(/^\d+$/, "Số điện thoại không hợp lệ!")
      .required("Số điện thoại không được để trống!"),
    email: Yup.string()
      .email("Địa chỉ email không hợp lệ!")
      .required("Email không được để trống!"),
    address: Yup.string().required("Địa chỉ không được để trống!"),
    category: Yup.string().required("Chuyên mục không được để trống!"),
    title: Yup.string().required("Tiêu đề không được để trống!"),
    description: Yup.string().required("Nội dung không được để trống!"),
    price: Yup.number()
      .required("Giá không được để trống!")
      .positive("Giá phải lớn hơn 0!"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post("http://localhost:3000/adPost", values);
      alert("Đăng tin thành công!");
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
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="name">Tên:</label>
                  <Field type="text" id="name" name="name" />
                  <ErrorMessage name="name" component="p" className="error" />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại:</label>
                  <Field type="text" id="phone" name="phone" />
                  <ErrorMessage name="phone" component="p" className="error" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email" component="p" className="error" />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Địa chỉ:</label>
                  <Field type="text" id="address" name="address" />
                  <ErrorMessage
                    name="address"
                    component="p"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Chuyên mục:</label>
                  <Field as="select" id="category" name="category">
                    <option value="">Chọn chuyên mục</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="p"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="title">Tiêu đề:</label>
                  <Field type="text" id="title" name="title" />
                  <ErrorMessage name="title" component="p" className="error" />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Nội dung:</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    style={{ height: "150px" }}
                  />
                  <ErrorMessage
                    name="description"
                    component="p"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Giá:</label>
                  <Field type="number" id="price" name="price" />
                  <ErrorMessage name="price" component="p" className="error" />
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
