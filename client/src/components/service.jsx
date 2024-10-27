import "../assets/css/ServiceCss.css";

const Service = () => {
  return (
    <div id="services" className="text-center" style={{ padding: "150px" }}>
      <div className="container-service">
        <div className="section-title">
          <h2>Dịch Vụ Của Chúng Tôi</h2>
        </div>
        <div className="row">
          <div className="col-md-3 crirl-info">
            <h3>Đăng tin miễn phí</h3>
            <p>
              Người dùng có thể đăng tin rao vặt miễn phí trên website của chúng
              tôi và kết nối với người mua nhanh chóng.
            </p>
          </div>
          <div className="col-md-3 crirl-info">
            <h3>Giao diện dễ sử dụng</h3>
            <p>
              Chúng tôi thiết kế giao diện đơn giản, thân thiện, giúp người dùng
              dễ dàng thao tác và đăng tin một cách nhanh chóng.
            </p>
          </div>
          <div className="col-md-3 crirl-info">
            <h3>Hỗ trợ 24/7</h3>
            <p>
              Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn 24/7, giải
              đáp mọi thắc mắc và đảm bảo quá trình sử dụng dịch vụ của bạn
              thuận lợi.
            </p>
          </div>
          <div className="col-md-3 crirl-info">
            <h3>Phân loại sản phẩm dễ dàng</h3>
            <p>
              Chúng tôi giúp bạn dễ dàng phân loại sản phẩm theo danh mục, giúp
              người mua tìm kiếm nhanh chóng và hiệu quả.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
