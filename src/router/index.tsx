import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Upload from "../pages/Upload";
import Analysis from "../pages/Analysis";
import Result from "../pages/Result";
import { useCVStore } from "../store/useCVStore";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const user = useCVStore((state) => state.user);
  const { loading } = useAuth();

  if (loading) return <div>Yüklənir...</div>;
  if (!user) return <Navigate to="/" />;
  return <Outlet />;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/result" element={<Result />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
