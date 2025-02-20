import { createBrowserRouter, Navigate } from "react-router-dom";
import AfterLoginNav from "./layouts/AfterLoginNav";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import HomeNav from "./layouts/HomeNav";
import Home from "./pages/Home";
// import Login from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeNav />,
    children: [
      { index: true, element: <Home /> },
      { path: "/auth", element: <Auth /> },
    ],
  },
  {
    path: "/success-login",
    element: <AfterLoginNav />,
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      { path: "/success-login/dashboard", element: <Dashboard /> },
    ],
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
]);
