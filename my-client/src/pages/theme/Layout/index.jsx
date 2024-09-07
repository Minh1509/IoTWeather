import React  from "react";
import Sidebar from "../Sidebar";
import NavBar from "../Navbar";

const Layout = (props) => {
  return (
    <>
      <Sidebar />
      <div className="content">
        <NavBar />
        <main>{props.children}</main>
      </div>
    </>
  );
};

export default Layout;
