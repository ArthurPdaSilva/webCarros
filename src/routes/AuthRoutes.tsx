import { Navigate, Outlet } from "react-router-dom";
import Container from "../components/Container";
import PanelHeader from "../features/Dashboard/components/PanelHeader";
import useAuth from "../hooks/useAuth";

export function PublicRoute() {
  const { signed, loadingAuth } = useAuth();
  if (loadingAuth) return <h1>Carregando...</h1>;
  return signed ? (
    <Navigate to="/dashboard" />
  ) : (
    <Container>
      <Outlet />
    </Container>
  );
}

export function PrivateRoute() {
  const { signed, loadingAuth } = useAuth();
  if (loadingAuth) return <h1>Carregando...</h1>;
  return signed ? (
    <Container>
      <PanelHeader />
      <Outlet />
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}
