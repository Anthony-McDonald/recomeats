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

  async function addNotif(type, post_id, id, notif_type) {
    try {
      const userResponse = await getUserWhoPosted(type, id);
      const user_notifying_id = userResponse?.user_id; 
      if (!user_notifying_id) {
        console.error("user_notifying_id is undefined");
        return; 
      }
  
      
      const body = { user_notifying_id, post_id, notif_type };
      const requestBody = JSON.stringify(body);
      
      const response = await fetch("http://localhost:5000/forum/newnotif/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
        },
        body: requestBody
      });
      
    } catch (error) {
      console.error("Error posting notification:", error);
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

  const getUserInfo = async (id) => {
    try {
      const url = new URL("http://localhost:5000/users/getuser/profile");
      if (id != null) {
        url.searchParams.append("user_id", id);
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token")
        }
      });

      const parseRes = await response.json();
      return parseRes;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getImageName = async (id) => {
    if (id === null) {
      return;
    }
    try {
      const url = new URL("http://localhost:5000/forum/getimage");
      url.searchParams.append("image_id", id);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token")
        }
      });

      const parseRes = await response.json();
      return parseRes.imageUrl;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUpvoteInfo = async (id, type) => {
    try {
      const url = new URL("http://localhost:5000/forum/upvotecount");
      url.searchParams.append("type_upvoted", type);
      url.searchParams.append("upvoted_id", id);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token")
        }
      });

      const parseRes = await response.json();
      return parseRes;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUserWhoPosted = async (type, id) => {
    try {
      const url = new URL("http://localhost:5000/forum/getuserposted");
      url.searchParams.append("type", type);
      url.searchParams.append("id", id);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token")
        }
      });

      const parseRes = await response.json();
      return parseRes;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };




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
      element: isAuthenticated ? <Forum setAuth={authenticateSwitch} getUserInfo={getUserInfo} getImageName={getImageName} getUpvoteInfo={getUpvoteInfo} addNotif={addNotif}/> : <RedirectComponent setAuth={authenticateSwitch} isAuth={isAuthenticated}/>,
      errorElement: <ErrorPage />,
    },
    {
      path:"/forum/thread/:id",
      element: isAuthenticated ? <Thread setAuth={authenticateSwitch} getUserInfo={getUserInfo} getImageName={getImageName} getUpvoteInfo={getUpvoteInfo} addNotif={addNotif} /> : <RedirectComponent setAuth={authenticateSwitch} isAuth={isAuthenticated}/>,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default Router;
