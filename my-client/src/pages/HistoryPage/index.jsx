import { useContext} from "react";
import { AppContext } from "../../data/AppContext";
import { Link } from "react-router-dom";
import { ROUTER } from "../../routes/router";

import "../DataSensorPage/style.scss";
import Table from "../../components/HistoryTable";

const HistoryPage = (props) => {
  const dataHistory = props.dataHistory;
  const { setCurrentPage } = useContext(AppContext);
 

  return (
    <>
      <div className="main-header">
        <div className="main-header-left">
          <h1>Action History</h1>
          <ul className="breadcrumb">
            <li>
              <Link
                to={ROUTER.USER.HOME}
                className="active"
                onClick={() => setCurrentPage("/")}
              >
                Dashboard
              </Link>
            </li>
            /
            <li>
              <Link
                to={ROUTER.USER.STATICS}
                onClick={() => setCurrentPage("/statics")}
              >
                Data Sensor
              </Link>
            </li>
          </ul>
        </div>
        <Table data = {dataHistory} />
      </div>
    </>
  );
};
export default HistoryPage;
