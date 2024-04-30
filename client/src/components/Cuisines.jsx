import React, { useState, useEffect } from 'react';
import '../css/cuisines.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Cuisines = () => {
  const [isCuisineAdding, setIsCuisineAdding] = useState(false);
  const [userCuisines, setUserCuisines] = useState([]);
  const [ingredientInputValue, setCuisineInputValue] = useState("");

  const addCuisineSwitch = () => {
    setIsCuisineAdding(true);
  }

  const handleCuisineInputValue = (e) => {
    setCuisineInputValue(e.target.value);
  };
  const addCuisine = (ingredient) => {
    const recipeCuisinesClone = [...userCuisines];
    recipeCuisinesClone.push(ingredient)
    setUserCuisines(recipeCuisinesClone);
} 
const enterPressed = (e) => {
  if (e.key === 'Enter') {
      e.preventDefault();
      addCuisine(ingredientInputValue);
      setCuisineInputValue('');
  }
}
  const removeClicked = (i) => {
      const ingredientCopy = [...userCuisines];
      ingredientCopy.splice(i, 1);
      setUserCuisines(ingredientCopy)
  }

  const confirmHandler = () => {
    // addUserCuisine()
    setIsCuisineAdding(false);
  }

  useEffect(() => {
    getCuisines();
  }, []);

  async function getCuisines() {
    try {
      const response = await fetch("http://localhost:5000/getuserpreferences", {
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
      const response = await fetch("http://localhost:5000/getcuisine/" + cuisine_id, {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });
      const parseRes = await response.json();
      return parseRes[0].preference_name;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div id="cuisines">
      <h3>Your current cuisines are:</h3>
      {/* if true */}
      {isCuisineAdding?
      // first component
        <div>
        <input type="text" value={ingredientInputValue} onChange={handleCuisineInputValue} onKeyDown={enterPressed} placeholder='Type your Cuisine and press enter!' className="form-control" id="recipeCuisinesInput"/>
      {userCuisines.map((ingredient, index) => (
        <li key={index}> {ingredient}
        <button type='button' onClick={() => removeClicked(index)}>X</button>
         </li>
      ))}
            <button onClick={confirmHandler}>Confirm Cuisines</button>
        </div> 
        : 
        // second component, if false
        <div>
        <ul>
        {userCuisines.map((cuisine, index) => (
          <li key={index}>{cuisine}</li>
        ))}
      </ul>
      </div>
      }

        <button onClick={addCuisineSwitch}>Add Cuisine</button>

    </div>
  );
};

export default Cuisines;
