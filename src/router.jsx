import { createBrowserRouter, Navigate } from "react-router-dom";
import AfterLoginNav from "./layouts/AfterLoginNav";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Support from "./pages/Support";

export const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <HomeNav />,
  //     children: [{ index: true, element: <Home /> }],
  //   },
  {
    path: "/",
    element: <AfterLoginNav />,
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/support", element: <Support />}
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
