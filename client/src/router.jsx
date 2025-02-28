import { createBrowserRouter, Navigate } from "react-router-dom";
import AfterLoginNav from "./layouts/AfterLoginNav";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

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
      { path: "dashboard", element: <Dashboard /> },
      { path: "settings", element: <Settings /> },

      { path: "calendar", element: <Calendar /> },
      {
        path: "projects",
        element: <Projects />,
      },
      { path: "add-task", element: <AddTask /> },
      { path: "edit-task/:id", element: <EditTask /> },
    ],
  },
]);
