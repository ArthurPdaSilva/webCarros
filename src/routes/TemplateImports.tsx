import { lazy } from "react";

export default {
  Template: lazy(() => import("../template")),
  Home: lazy(() => import("../features/Home")),
  Login: lazy(() => import("../features/Login")),
  CarDetail: lazy(() => import("../features/CarDetail")),
  Register: lazy(() => import("../features/Register")),
  Dashboard: {
    Index: lazy(() => import("../features/Dashboard")),
    New: lazy(() => import("../features/Dashboard/New")),
  },
};
