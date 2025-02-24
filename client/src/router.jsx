import { createBrowserRouter, Navigate } from "react-router-dom";
import AfterLoginNav from "./layouts/AfterLoginNav";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import HomeNav from "./layouts/HomeNav";
import Home from "./pages/Home";
// import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

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
      { path: "/success-login/calendar", element: <Calendar /> },
      {
        path: "/success-login/projects",
        element: <Projects />,
      },
      { path: "/success-login/add-task", element: <AddTask /> },
      { path: "/success-login/edit-task/:id", element: <EditTask /> },
    ],
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
]);
