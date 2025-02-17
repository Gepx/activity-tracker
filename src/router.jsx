import { createBrowserRouter, Navigate } from "react-router-dom";
import AfterLoginNav from "./layouts/AfterLoginNav";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

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
    ],
  },
  {
    path: "/login",
    element: <Login />,
    // children: [
    //   { index: true, element: <Navigate to="/dashboard" /> },
    //   { path: "/dashboard", element: <Dashboard /> },
    // ],
  },
]);
