import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [userRole, setUserRole] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Invalid token:", error);
        toast.error("Yêu cầu đăng nhập", { autoClose: 3000 });
        history.push("/");
      }
    }
  }, []);

  if (userRole === null) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        userRole === "admin" ? (
          React.isValidElement(Component) ? (
            React.cloneElement(Component, props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/unauthorized" />
        )
      }
    />
  );
};

export default AdminRoute;
