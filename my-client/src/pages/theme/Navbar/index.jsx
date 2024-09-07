import React, { useState } from "react";
import { useEffect } from "react";
import { ROUTER } from "../../../routes/router";
import { MdOutlineMenu } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../../../data/AppContext";

const NavBar = () => {
  const { setcurrentPage } = useContext(AppContext);
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(location.pathname.length <= 1);
  useEffect(() => {
    const showSearch = location.pathname.length <= 1;
    setShowSearch(showSearch);
  }, [location]);
  return (
    <nav>
      <MdOutlineMenu />
      <form action="#" className={showSearch ? "" : "hidden"}>
        <div className="form-input">
          <input type="text" placeholder="Search..." />
          <button className="search-btn" type="submit">
            <CiSearch />
          </button>
        </div>
      </form>


      <Link
        to={ROUTER.USER.PROFILE}
        className="profile"
        onClick={() => setcurrentPage(ROUTER.USER.PROFILE)}
      >
        <FaRegUserCircle />
      </Link>
    </nav>
  );
};

export default NavBar;
