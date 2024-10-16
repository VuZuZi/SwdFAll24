import React, { useState } from "react";
import img from "../assets/img/R2.png";
import "../assets/css/AboutCss.css";

const About = (props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <img src={img} className="img-responsive" alt="" />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Về Chúng Tôi</h2>
              <p>
                Câu chuyện hình thành trang web rao vặt: Chúng tôi hiểu rằng trong
                nhịp sống hiện đại và hối hả, nhu cầu mua bán trao đổi các sản
                phẩm và dịch vụ là vô cùng lớn. Người dùng cần một nơi đáng tin
                cậy để dễ dàng đăng tin, mua bán và tìm kiếm những sản phẩm, dịch
                vụ phù hợp với nhu cầu cá nhân.
                {expanded && (
                  <>
                    <p>
                      "Chúng tôi ra đời với mong muốn kết nối mọi người trên toàn
                      quốc, từ những sản phẩm thiết yếu đến những dịch vụ đa dạng,
                      từ đồ cũ đến đồ mới. Chúng tôi tin rằng sự kết nối sẽ giúp
                      cuộc sống dễ dàng và tiện lợi hơn."
                    </p>
                    <p>
                      "Với đội ngũ chuyên nghiệp và nền tảng vững chắc, chúng tôi
                      tự hào mang đến cho người dùng một môi trường an toàn, đáng
                      tin cậy, giúp việc mua bán, trao đổi trở nên nhanh chóng và
                      thuận lợi."
                    </p>
                  </>
                )}
                <button onClick={toggleExpand} className="load-more">
                  {expanded ? "Rút gọn" : "Xem thêm"}
                </button>
              </p>
              <h3>Tại Sao Chọn Chúng Tôi?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>&#10003; Đăng tin nhanh chóng và miễn phí</ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>&#10003; Giao diện thân thiện và dễ sử dụng</ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>&#10003; Hỗ trợ khách hàng 24/7</ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>&#10003; Nhiều danh mục đa dạng, phong phú</ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>&#10003; Cam kết bảo mật và an toàn</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
