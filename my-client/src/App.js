import "./styles/App.scss";
import React, { useEffect, useState } from 'react';
import HomePage from "./components/HomePage";
import Layout from "./components/theme/Layout";
import ProfilePage from "./components/ProfilePage";
import StaticPage from "./components/StaticPage";
import HistoryPage from "./components/HistoryPage";
import { ROUTER } from "./routes/router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./data/AppContext";
import useDataSensor from "./assets/API/DataSenSor";


function App() {
  const [loading, setLoading] = useState(true);
  const dataSenSor = useDataSensor();
 

  useEffect(() => {
    if (dataSenSor && dataSenSor.data ) {
      setLoading(false);
    }
  }, [dataSenSor]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userRoute = [
    {
      path: ROUTER.USER.HOME,
      component: <HomePage dataSensor={dataSenSor.data}  />,
    },
    {
      path: ROUTER.USER.STATICS,
      component: <StaticPage dataSensor={dataSenSor.data} />,
    },
    {
      path: ROUTER.USER.HISTORY,
      component: <HistoryPage />,
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