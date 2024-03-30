import { createBrowserRouter } from "react-router-dom";
import TemplateImports from "./TemplateImports";

const router = createBrowserRouter([
  {
    element: <TemplateImports.Template />,
    children: [
      {
        path: "/",
        element: <TemplateImports.Home />,
      },
      {
        path: "/car/:id",
        element: <TemplateImports.CarDetail />,
      },
      {
        element: <TemplateImports.PrivateRoute />,
        children: [
          {
            path: "/dashboard",
            element: <TemplateImports.Dashboard.Index />,
          },
          {
            path: "/dashboard/new",
            element: <TemplateImports.Dashboard.New />,
          },
        ],
      },
    ],
  },
  {
    element: <TemplateImports.PublicRoute />,
    children: [
      {
        path: "/login",
        element: <TemplateImports.Login />,
      },
      {
        path: "/register",
        element: <TemplateImports.Register />,
      },
    ],
  },
]);

export default router;
