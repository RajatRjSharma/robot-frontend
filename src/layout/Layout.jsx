import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import Notification from "../components/Notification";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { loader } = useSelector((state) => state.generic);
  return (
    <div className="h-full w-full">
      {loader && <Loader />}
      <Notification />
      <Header />
      <div className="flex w-full h-full">
        <Sidebar />
        <main
          className="flex-1 overflow-auto"
          style={{ height: window.innerHeight - 56 + "px" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
