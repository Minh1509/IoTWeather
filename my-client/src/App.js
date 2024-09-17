import "./styles/App.scss";
import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage"
import Layout from "./pages/theme/Layout"
import ProfilePage from "./pages/ProfilePage";
import DataSensorPage from "./pages/DataSensorPage";
import HistoryPage from "./pages/HistoryPage";
import { ROUTER } from "./routes/router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./data/AppContext";
import useDataSensor from "./data/DataSensor";
import useDataHistory from "./data/DataHistory";

function App() {
  const [loading, setLoading] = useState(true);
  const dataSensor = useDataSensor();
  const dataHistory = useDataHistory();

  useEffect(() => {
    if (dataSensor && dataSensor.data && dataHistory && dataHistory.data) {
      setLoading(false);
    }
  }, [dataSensor, dataHistory]);

  if (loading) {
    return <div>Data not found</div>;
  }

  // console.log(dataSensor.data);
  // console.log(dataHistory.data);

  const userRoute = [
    {
      path: ROUTER.USER.HOME,
      component: <HomePage dataSensor={dataSensor.data} dataHistory ={dataHistory.data}/>,
    },
    {
      path: ROUTER.USER.STATICS,
      component: <DataSensorPage dataSensor={dataSensor.data} />,
    },
    {
      path: ROUTER.USER.HISTORY,
      component: <HistoryPage dataHistory={dataHistory.data} />,
    },
    {
      path: ROUTER.USER.PROFILE,
      component: <ProfilePage />,
    },
  ];

  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            {userRoute.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
