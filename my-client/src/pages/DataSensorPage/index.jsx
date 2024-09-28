import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../data/AppContext";
import { Link } from "react-router-dom";
import { ROUTER } from "../../routes/router";
import axios from "axios";

import Table from "../../components/DataSensorTable";
import "./style.scss";

const DataSensorPage = (props) => {
  const { setCurrentPage } = useContext(AppContext);
  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/count");
        setDataCount(Number(response.data.data));
      } catch (error) {}
    };

    fetchData();
    setInterval(fetchData, 5000);
  }, []);

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
        <Table data={props.dataSensor} dataCount={dataCount} />
      </div>
    </>
  );
};

export default DataSensorPage;
