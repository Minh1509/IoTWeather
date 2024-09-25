import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTER } from "../../../routes/router";
import { FaCode } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { BiAnalyse } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { RiGroupLine } from "react-icons/ri";

import { AppContext } from "../../../data/AppContext";

const SideBar = () => {
  const { currentPage } = useContext(AppContext);
  const [activeLink, setActiveLink] = useState(currentPage);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    setActiveLink(currentPage);
  }, [currentPage]);
  return (
    <>
      <aside className="sidebar">
        <div className="logo">
          <FaCode />
          <div className="logo-name">
            <span>I</span>o<span>T</span> Weather
          </div>
        </div>

        <ul className="side-menu">
          <li className={activeLink === ROUTER.USER.HOME ? "active" : ""}>
            <Link
              to={ROUTER.USER.HOME}
              onClick={() => handleLinkClick(ROUTER.USER.HOME)}
            >
              <MdDashboard />
              Dashboard
            </Link>
          </li>
          <li className={activeLink === ROUTER.USER.STATICS ? "active" : ""}>
            <Link
              to={ROUTER.USER.STATICS}
              onClick={() => handleLinkClick(ROUTER.USER.STATICS)}
            >
              <BiAnalyse />
              Data Sensor
            </Link>
          </li>
          <li className={activeLink === ROUTER.USER.HISTORY ? "active" : ""}>
            <Link
              to={ROUTER.USER.HISTORY}
              onClick={() => handleLinkClick(ROUTER.USER.HISTORY)}
            >
              <FaHistory />
              Action History
            </Link>
          </li>
          <li className={activeLink === ROUTER.USER.PROFILE ? "active" : ""}>
            <Link
              to={ROUTER.USER.PROFILE}
              onClick={() => handleLinkClick(ROUTER.USER.PROFILE)}
            >
              <RiGroupLine />
              Profile
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};
export default SideBar;
