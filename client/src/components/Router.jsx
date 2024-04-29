import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Dashboard from "./Dashboard";
import ErrorPage from "./ErrorPage";
import { useState } from 'react';

const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateSwitch = (input) => {
    setIsAuthenticated(input);
    console.log(isAuthenticated);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Dashboard setAuth={authenticateSwitch} /> : <App setAuth={authenticateSwitch} isAuthenticated={isAuthenticated} />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default Router;
