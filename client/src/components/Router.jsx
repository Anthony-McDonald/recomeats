import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Dashboard from "./Dashboard"
import Login from "./Login"
import Register from "./Login"
import ErrorPage from "./ErrorPage";
import { useState } from 'react'

const Router = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authenticateSwitch = () => {
        setIsAuthenticated(true);
        console.log(isAuthenticated);
    }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App setAuth={authenticateSwitch}/>,
      errorElement: <ErrorPage />,
    },
    {
        path:"/login",
        element: isAuthenticated ? <Dashboard /> : <Login authenticateSwitch={authenticateSwitch} />,
        errorElement: <ErrorPage />,
    },
    {
        path:"/register",
        element: isAuthenticated ? <Login authenticateSwitch={authenticateSwitch} /> : <Register />,
        errorElement: <ErrorPage />,
    },
    {
        path:"/dashboard",
        element: isAuthenticated ? <Dashboard /> : <Login authenticateSwitch={authenticateSwitch} />,
        errorElement: <ErrorPage />,
    }

  ]);

  return (
      <RouterProvider router={router} />
  );
};

export default Router;