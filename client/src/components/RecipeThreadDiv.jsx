import { useEffect, useState } from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/thread.css'
import RecipeImageBox from './RecipeImageBox';

const RecipeThreadDiv = ({ post_id, getUserInfo, getImageName, getIngredients, ingredients }) => {
  const [dataToLoad, setDataToLoad] = useState(null);
  const [userData, setUserData] = useState(null);
  const [madeUserImage, setMadeUserImage] = useState("");
  const [directions, setDirections] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  // Retrieve thread info
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
      await getIngredients(parseRes.recipe_id);
      await getInstructions(parseRes.recipe_id);

      setUserData(userInfo);
      setDataToLoad(parseRes);


      if (userInfo && userInfo.profile_image) {
        setMadeUserImage(`/images/profile-images/${userInfo.profile_image}.png`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // get recipe instructions to create
  const getInstructions = async (recipe_id) => {
    try {
      const url = new URL("http://localhost:5000/recipes/getdirections/");
      url.searchParams.append("recipe_id", recipe_id);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token"),
        },
      });
      const parseRes = await response.json();
      setDirections(parseRes.recipe_instructions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div id="recipe-thread-div">
      <div id="user-box">
      {/* Lots of the same here again, if the variables have been filled, display the relevant information */}
        {madeUserImage ? (
          <img className='usr-img' src={madeUserImage} alt="usr-img" />
        ) : (
          <p></p>
        )}
        <h2 className='user-text'>{userData ? `${userData.first_name} ${userData.last_name}` : 'Loading...'}</h2>
        <p id="timestamp">5 hours ago</p>
      </div>
      {dataToLoad && (
        <>
          <div id="thread-title">{dataToLoad.title}</div>
          <div id="thread-desc">{dataToLoad.body}</div>
          <div id="directions">
            <h4>Directions:</h4>
            {directions}
          </div>
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
