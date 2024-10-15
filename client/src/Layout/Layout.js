import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-main text-white">
      <Header />

      <div className="container mx-auto py-1 flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
