import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import About  from "./components/about";
import { Contact } from "./components/contact";
import { Category } from "./components/category";
import { Login } from "./components/login";
import {NewPostForm} from "./components/post.jsx";
import Post from './components/post'; 
import ProductDetail from "./components/productDetail.jsx";
import "./App.css";
import { Profile } from "./components/profile";
import { AdminPage } from "./components/adminPage/adminPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Service from "./components/service";
import AppWrapper from "../src/utils/AppWrapper.js";
import { UserManagement } from "./components/adminPage/userManagement ";
import AdsManager from "./components/adminPage/adsManage.jsx";
import AdminRoute from "./components/adminPage/AdminRoute.jsx";
import Unauthorized from "./components/unauthorized.jsx";
import Loading from "./components/loading.jsx";
import withLoading from "./components/withLoading";
const App = () => {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    setCart([...cart, product]);
    
  };

  return (
    <Router>
      <AppWrapper>
        <div>
          <Navigation />
          <ToastContainer />

          <Switch>
          <Route path="/postAd" component={withLoading(Post)} />
            <Route path="/postAd" component={withLoading(Post)} />
            <Route path="/login" component={withLoading(Login)} />
            <Route path="/" exact component={withLoading(Header)} />
            <Route path="/services" component={withLoading(Service)} />
            <Route path="/about" component={withLoading(About)} />
            <Route path="/profile" component={withLoading(Profile)} />
            <Route path="/admin" component={withLoading(AdminPage)} />
            <Route path="/postAd" component={withLoading(Post)} />
            <Route path="/category">
              <Category cart={cart} addToCart={addToCart} />
            </Route>
            <Route path="/productdetail/:productId">
              <ProductDetail addToCart={addToCart} />
            </Route>
            <AdminRoute
              path="/admin-user"
              component={withLoading(UserManagement)}
            />
            <AdminRoute
              path="/admin-ads"
              component={withLoading(AdsManager)}
            />
            <Route path="/unauthorized" component={withLoading(Unauthorized)} />
            <Route path="/loading" component={withLoading(Loading)} />
          </Switch>
          <Contact />
        </div>
      </AppWrapper>
    </Router>
  );
};

export default App;
