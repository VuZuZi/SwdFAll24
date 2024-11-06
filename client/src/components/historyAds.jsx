import React, { useState, useEffect } from "react";
import "../assets/css/historyCss.css";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const HistoryAds = () => {
  const [activeTab, setActiveTab] = useState("approved");
  const [approvedAds, setApprovedAds] = useState([]);
  const [pendingAds, setPendingAds] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id_user;

      const fetchHistoryAds = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/ad/user/${userId}`
          );

          const approved = response.data.filter((ad) => ad.approved === true);
          const pending = response.data.filter((ad) => ad.approved === false);

          setApprovedAds(approved);
          setPendingAds(pending);
        } catch (error) {
          console.error("Error fetching product details: ", error);
        }
      };

      fetchHistoryAds();
    } else {
      toast.error("Yêu cầu đăng nhập", { autoClose: 3000 });
      history.push("/");
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="history-container">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "approved" ? "active" : ""}`}
          onClick={() => handleTabChange("approved")}
        >
          Tin đã duyệt
        </button>
        <button
          className={`tab-button ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => handleTabChange("pending")}
        >
          Tin chưa duyệt
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "approved" && (
          <div className="ad-list">
            {approvedAds.length > 0 ? (
              approvedAds.map((ad) => (
                <Link to={`/productdetail/${ad._id}`} key={ad._id} className="ad-item">
                    <img src={ad.images[0]} alt={ad.title} className="ad-image" />
                    <div className="ad-info">
                      <h4>{ad.title}</h4>
                      <p className="ad-price">{formatPrice(ad.price)} VND</p>
                      <p className="ad-location">{ad.location}</p>
                      <span className="ad-time">
                        {formatDistanceToNow(new Date(ad.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <button className="ad-detail-button">
                      <FontAwesomeIcon icon={faCircleInfo} />
                    </button>
                  </Link>
              ))
            ) : (
              <p>Không có tin đã duyệt nào.</p>
            )}
          </div>
        )}

        {activeTab === "pending" && (
          <div className="ad-list">
            {pendingAds.length > 0 ? (
              pendingAds.map((ad) => (
                <Link to={`/productdetail/${ad._id}`} key={ad._id} className="ad-item">
                <img src={ad.images[0]} alt={ad.title} className="ad-image" />
                <div className="ad-info">
                  <h4>{ad.title}</h4>
                  <p className="ad-price">{formatPrice(ad.price)} VND</p>
                  <p className="ad-location">{ad.location}</p>
                  <span className="ad-time">
                    {formatDistanceToNow(new Date(ad.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <button className="ad-detail-button btn btn-success">
                  <FontAwesomeIcon icon={faCircleInfo} />
                </button>
              </Link>
              ))
            ) : (
              <p>Không có tin chưa duyệt nào.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryAds;
