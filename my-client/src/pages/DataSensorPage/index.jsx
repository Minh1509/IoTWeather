import { useContext } from "react";
import { AppContext } from "../../data/AppContext";
import { Link } from "react-router-dom";
import { ROUTER } from "../../routes/router";

import Table from "../../components/DataSensorTable";
import "./style.scss";

const DataSensorPage = (props) => {
  const { setCurrentPage } = useContext(AppContext);

  return (
    <>
      <div className="main-header">
        <div className="main-header-left">
          <h1>Data Sensor</h1>
          <ul className="breadcrumb">
            <li>
              <Link to={ROUTER.USER.HOME} onClick={() => setCurrentPage("/")}>
                Dashboard
              </Link>
            </li>
            /
            <li>
              <Link
                to={ROUTER.USER.HISTORY}
                onClick={() => setCurrentPage("/history")}
                className="active"
              >
                Action History
              </Link>
            </li>
          </ul>
        </div>
        <Table data = {props.dataSensor}/>
      </div>
    </>
  );
};
export default DataSensorPage;
