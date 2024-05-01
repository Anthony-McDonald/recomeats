import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Dashboard from "./Dashboard";
import ErrorPage from "./ErrorPage";
import AiRecipe from "./AiRecipe";
import { useState } from 'react'
import RedirectComponent from "./RedirectComponent";


const Router = () => {
    
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCuisines, setUserCuisines] = useState([]);

  const authenticateSwitch = (input) => {
    setIsAuthenticated(input);
    console.log(isAuthenticated);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Dashboard setAuth={authenticateSwitch}  /> : <App setAuth={authenticateSwitch} />,
      errorElement: <ErrorPage />,
    },
    {
      path:"/ai-recipe",
      element: isAuthenticated ? <AiRecipe setAuth={authenticateSwitch} cuisinePreferences={userCuisines}/> : <RedirectComponent setAuth={authenticateSwitch} isAuth={isAuthenticated}/>,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default Router;
