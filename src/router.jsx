import { createBrowserRouter, Navigate } from "react-router-dom";
import AfterLoginNav from "./layouts/AfterLoginNav";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Calendar from "./pages/Calendar";

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
      { path: "/calendar", element: <Calendar /> },
      { path: "/projects", element: <Projects /> },
    ],
  },
]);
