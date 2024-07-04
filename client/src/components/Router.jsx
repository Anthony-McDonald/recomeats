import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Dashboard from "./Dashboard";
import ErrorPage from "./ErrorPage";
import AiRecipe from "./AiRecipe";
import Forum from "./Forum";
import Thread from './Thread'
import { useState, useEffect } from 'react'
import RedirectComponent from "./RedirectComponent";


const Router = () => {
    
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCuisines, setUserCuisines] = useState([]);

  useEffect(() => {
    getCuisines(); // Fetch user cuisines when the component mounts
  }, []);

  async function addRecipe(recipe_name, recipe_description, recipe_ingredients, recipe_instructions) {
    try {
      const requestBody = JSON.stringify({
        recipe_name: recipe_name,
        recipe_ingredients: recipe_ingredients,
        recipe_description: recipe_description,
        recipe_instructions: recipe_instructions
      })
      await fetch("http://localhost:5000/recipes/addrecipe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
        },
        body: requestBody
      });

    } catch (error) {
      console.error("Error posting manual recipe:", error)
    }
  }

  async function getCuisines() {
    try {
      const response = await fetch("http://localhost:5000/cuisines/getuserpreferences", {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();


      // Get cuisine names for each preference_id
      const cuisineNames = await Promise.all(parseRes.map(cuisine => getCuisineName(cuisine.preference_id)));

      setUserCuisines(cuisineNames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getCuisineName(cuisine_id) {
    try {
      const response = await fetch("http://localhost:5000/cuisines/getcuisine/" + cuisine_id, {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });
      const parseRes = await response.json();
      return parseRes[0].preference_name;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const authenticateSwitch = (input) => {
    setIsAuthenticated(input);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Dashboard setAuth={authenticateSwitch} userCuisines={userCuisines} getCuisines={getCuisines}  /> : <App setAuth={authenticateSwitch} />,
      errorElement: <ErrorPage />,
    },
    {
      path:"/ai-recipe",
      element: isAuthenticated ? <AiRecipe setAuth={authenticateSwitch} cuisinePreferences={userCuisines} addRecipe={addRecipe}/> : <RedirectComponent setAuth={authenticateSwitch} isAuth={isAuthenticated}/>,
      errorElement: <ErrorPage />,
    },
    {
      path:"/forum",
      element: isAuthenticated ? <Forum setAuth={authenticateSwitch} /> : <RedirectComponent setAuth={authenticateSwitch} isAuth={isAuthenticated}/>,
      errorElement: <ErrorPage />,
    },
    {
      path:"/thread",
      element: isAuthenticated ? <Thread setAuth={authenticateSwitch} /> : <RedirectComponent setAuth={authenticateSwitch} isAuth={isAuthenticated}/>,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default Router;
