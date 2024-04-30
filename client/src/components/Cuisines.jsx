import React, { useState, useEffect } from 'react';
import '../css/cuisines.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Cuisines = () => {
  const [isCuisineAdding, setIsCuisineAdding] = useState(false);
  const [userCuisines, setUserCuisines] = useState([]);
  const [userCuisineIds, setUserCuisineIds] = useState([]);

  const addCuisineSwitch = () => {
    setIsCuisineAdding(true);

    for (let i = 0; i < userCuisineIds.length; i++) {
      switch (userCuisineIds[i]) {
        case 1: 
        setIsChecked(prevState => ({
          ...prevState,
          chinese: true
        }));
          break;
        case 2: 
        setIsChecked(prevState => ({
          ...prevState,
          indian: true
        }));
          break;
        case 3: 
        setIsChecked(prevState => ({
          ...prevState,
          italian: true
        }));
          break;
        case 4: 
        setIsChecked(prevState => ({
          ...prevState,
          african: true
        }));
          break;
        case 5: 
        setIsChecked(prevState => ({
          ...prevState,
          mediterranean: true
        }));
          break;
      }
      deleteUserCuisine()
    }
    
  }

  const [isChecked, setIsChecked] = useState({
    chinese: false,
    indian: false,
    italian: false,
    african: false,
    mediterranean: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setIsChecked({ ...isChecked, [name]: checked });
    console.log(name);
    console.log(checked);
  };

  const confirmHandler = () => {
    // addUserCuisine()
    setIsCuisineAdding(false);
    saveSelectedCuisines(isChecked);
    resetBoxes();
  }
  const resetBoxes = () => {
    setIsChecked({
      chinese: false,
      indian: false,
      italian: false,
      african: false,
      mediterranean: false
    });
  };
  

  function saveSelectedCuisines() {
    const {chinese, indian, italian, african, mediterranean} = isChecked;

    if (chinese) {
      saveCuisine(1);
    }
    if (indian) {
      saveCuisine(2);
    }
    if (italian) {
      saveCuisine(3);
    }
    if (african) {
      saveCuisine(4);
    }
    if (mediterranean) {
      saveCuisine(5);
    }
  }

  async function saveCuisine(cuisine_id) {
    try {
      await fetch("http://localhost:5000/addusercuisine/" + cuisine_id, {
        method: "POST",
        headers: { token: localStorage.getItem("token") }
      })

    } catch (error) {
      console.error("Error fetching data:", error)
    }
    getCuisines();
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
      const cuisineIds = parseRes.map(cuisine => cuisine.preference_id);
      const cuisineNames = await Promise.all(parseRes.map(cuisine => getCuisineName(cuisine.preference_id)));

      setUserCuisineIds(cuisineIds);
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

  async function deleteUserCuisine() {
    try {
      await fetch("http://localhost:5000/deleteusercuisine/", {
        method: "DELETE",
        headers: { token: localStorage.getItem("token") }
      });
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
      <label>
        <input
          type="checkbox"
          name="chinese"
          checked={isChecked.chinese}
          onChange={handleCheckboxChange}
        />
        Chinese
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="indian"
          checked={isChecked.indian}
          onChange={handleCheckboxChange}
        />
        Indian
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="italian"
          checked={isChecked.italian}
          onChange={handleCheckboxChange}
        />
        Italian
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="african"
          checked={isChecked.african}
          onChange={handleCheckboxChange}
        />
        African
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="mediterranean"
          checked={isChecked.mediterranean}
          onChange={handleCheckboxChange}
        />
        Mediterannean
      </label>
      <br />
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