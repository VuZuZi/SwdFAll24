import React, { useEffect, useState } from "react";
import axios from "axios";
import backgroundImage1 from "../assets/img/xe.jpg";
import backgroundImage2 from "../assets/img/xe2.jpg";
import backgroundImage3 from "../assets/img/lap-top.jpg";
import backgroundImage4 from "../assets/img/xe3.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img from "../assets/img/R2.png";
import { Link } from "react-router-dom";
import "../assets/css/HeaderCss.css";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Service from "../components/service";
import About from "../components/about";
import Category from "./category";

export const Header = (props) => {
  const backgrounds = [
    backgroundImage1,
    backgroundImage2,
    backgroundImage3,
    backgroundImage4,
  ];
  const [currentBackground, setCurrentBackground] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prevBackground) =>
        prevBackground === backgrounds.length - 1 ? 0 : prevBackground + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [backgrounds.length]);
  return (
    <>
      <header id="header" style={{ marginTop: "22px" }}>
        <div className="intro">
          <div
            className="overlay"
            style={{
              backgroundImage: `url(${backgrounds[currentBackground]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "background-image 1.5s ease-in-out",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1 style={{ fontSize: "42px", lineHeight: "1.2" }}>
                    <span style={{ color: "#7FFF00" }}>Kết nối</span> người bán
                    và người mua,
                    <br />
                    <span style={{ color: "#7FFF00" }}>trao đổi</span> nhu cầu
                    khắp mọi nơi.
                  </h1>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.2",
                      color: "#FFFFFF",
                    }}
                  >
                    Từ những món hàng được rao bán, không chỉ là sản phẩm, mà
                    còn là những nhu cầu và mong muốn được truyền tải. Chúng tôi
                    mang đến nền tảng giúp kết nối mọi người từ mọi miền, đem
                    lại sự tiện lợi và hiệu quả trong cuộc sống bận rộn của
                    thành phố.
                  </span>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Service />
      <About />
      <Category />
    </>
  );
};
