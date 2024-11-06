import React, { useEffect, useState } from "react";
import logo from "../assets/img/Logo.png";
import { useHistory } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../assets/css/navigationCss.css";
import { toast } from "react-toastify";

export const Navigation = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [cartLength, setCartLength] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (error) {
        console.log("Error decoding token: ", error);
      }
    }
    updateCartLength();
  }, []);

  const updateCartLength = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLength(cartItems.length);
  };

  const handleLogout = () => {
    toast.success("Đăng xuất Thành Công", { autoClose: 3000 });
    localStorage.removeItem("token");
    localStorage.removeItem("persist:root");
    setIsLoggedIn(false);
    history.push("/");
    window.location.reload();
  };

  const logoStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    overflow: "hidden",
  };
  const handlePostAd = () => {
    history.push("/postAd"); // Chuyển hướng đến trang đăng tin
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const handleNavigation = (path) => {
    history.push(path);
  };
  

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ ...logoStyle, marginRight: "20px" }}>
              <img src={logo} style={imageStyle} alt="Logo"></img>
            </div>
            <a
              className="navbar-brand page-scroll"
              onClick={() => handleNavigation("/")}
            >
              <span style={{ color: "#7FFF00" }}>Rao </span> Vặt
            </a>{" "}
          </div>
        </div>
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <div style={{ display: "flex" }}>
            <ul className="nav navbar-nav navbar-right">
              {userRole !== "admin" && (
                <>
                  {/* Các mục khác nếu cần */}
                </>
              )}

              <li>
                <a
                  className="page-scroll"
                  onClick={() => handleNavigation("/category")}
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  className="page-scroll"
                  onClick={() => handleNavigation("/about")}
                >
                  Chúng Tôi
                </a>
              </li>

              {isLoggedIn && (
                <li>
                  <a
                    className="page-scroll"
                    onClick={() => handleNavigation("/profile")}
                  >
                    Tài Khoản
                  </a>
                </li>
              )}
              {userRole === "admin" && (
                <li>
                  <a
                    className="page-scroll"
                    onClick={() => handleNavigation("/admin")}
                  >
                    Quản Lý
                  </a>
                </li>
              )}

              <li>
                {isLoggedIn ? (
                  <a className="page-scroll" onClick={handleLogout}>
                    Đăng Xuất
                  </a>
                ) : (
                  <a
                    className="page-scroll"
                    onClick={() => handleNavigation("/login")}
                  >
                    Đăng Nhập
                  </a>
                )}
              </li>
            </ul>
            {/* Chỉ hiển thị nút Đăng Tin nếu người dùng đã đăng nhập */}
            {isLoggedIn && (
              <button
                className="btn btn-success"
                onClick={handlePostAd}
                style={{ marginLeft: "10px" }}
              >
                Đăng tin
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};