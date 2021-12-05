import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { DASHBOARD_ROUTE } from "./constants/routes";
import { Dashboard } from "./views/Dashboard";

const App = () => (
  <Layout>
    <Routes>
      <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
      <Route path="*" element={<Navigate to={DASHBOARD_ROUTE} />} />
    </Routes>
  </Layout>
);

export default App;
