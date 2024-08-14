import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-full w-full">
      <Header />
      <div className="flex w-full h-full">
        <Sidebar />
        <main
          className="w-full"
          style={{ height: window.innerHeight - 56 + "px" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
