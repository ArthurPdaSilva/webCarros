import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import router from "./routes";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<h1>Carregando...</h1>}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
