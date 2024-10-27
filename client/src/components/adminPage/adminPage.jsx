import React from "react";
import "../../assets/css/AdminCss.css";
import { Link } from "react-router-dom";

export const AdminPage = () => {
  return (
    <div className="container-admin" style={{ marginTop: "150px" }}>
      <h1>Quản Lý</h1>
      <Link to={`/admin-ads`}>
        <button className="btn-admin">
        <a>Quản Lý Rao Vặt</a>
        </button>
      </Link>

      <button className="btn-admin">
        <a href="admin-user">Quản Lý User</a>
      </button>
    </div>
  );
};
