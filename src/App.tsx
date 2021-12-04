import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { TRANSACTIONS_ROUTE } from "./constants/routes";
import { Transactions } from "./containers/Transactions";

const App = () => (
  <Layout>
    <Routes>
      <Route path={TRANSACTIONS_ROUTE} element={<Transactions />} />
      <Route path="*" element={<Navigate to={TRANSACTIONS_ROUTE} />} />
    </Routes>
  </Layout>
);

export default App;
