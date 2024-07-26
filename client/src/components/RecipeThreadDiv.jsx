import React, { useEffect, useState } from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/thread.css'
import RecipeImageBox from './RecipeImageBox';

const RecipeThreadDiv = ({ post_id, getUserInfo, getImageName }) => {
  const [dataToLoad, setDataToLoad] = useState(null);
  const [userData, setUserData] = useState(null);
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const url = new URL("http://localhost:5000/forum/thread/" + post_id);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token")
        }
      });

      const parseRes = await response.json();
      const userInfo = await getUserInfo(parseRes.user_id);
      await getIngredients(parseRes.recipe_id)
      setUserData(userInfo);
      setDataToLoad(parseRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  async function getIngredients(recipe_id) {
    try {
      const response = await fetch("http://localhost:5000/recipes/getingredients/" + recipe_id, {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();


      setIngredients(parseRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }



  return (
    <div id="recipe-thread-div">
      <div id="user-box">
        <img className='usr-img' src="/images/1.jpg" alt="usr-img" />
        <h2 className='user-text'>{userData ? `${userData.first_name} ${userData.last_name}` : 'Loading...'}</h2>
        <p id="timestamp">5 hours ago</p>
      </div>
      {dataToLoad && (
        <>
          <div id="thread-title">{dataToLoad.title}</div>
          <div id="thread-desc">{dataToLoad.body}</div>
          <div id="ingredients">
            {ingredients.map((ingredient, index) => (
              <div key={index} id='ingredient' className="ingred-div">{ingredient}</div>
            ))}
          </div>
          <div id="recipe-images">
            <RecipeImageBox getImageName={getImageName} image_id={dataToLoad.image}/>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeThreadDiv;
