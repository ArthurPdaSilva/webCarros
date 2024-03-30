import { Navigate, Outlet } from "react-router-dom";

export function PublicRoute() {
  const isAuth = false;
  return isAuth ? <Navigate to="/dashboard" /> : <Outlet />;
}

export function PrivateRoute() {
  const isAuth = true;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
