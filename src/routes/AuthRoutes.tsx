import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export function PublicRoute() {
  const { signed, loadingAuth } = useContext(AuthContext);
  if (loadingAuth) return <h1>Carregando...</h1>;
  return signed ? <Navigate to="/dashboard" /> : <Outlet />;
}

export function PrivateRoute() {
  const { signed, loadingAuth } = useContext(AuthContext);
  if (loadingAuth) return <h1>Carregando...</h1>;
  return signed ? <Outlet /> : <Navigate to="/login" />;
}
