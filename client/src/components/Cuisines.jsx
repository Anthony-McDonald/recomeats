import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/cuisines.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Cuisines = ({userCuisines, getCuisines}) => {
  const [isCuisineAdding, setIsCuisineAdding] = useState(false);

  console.log("from cuisine: ", userCuisines)

  const addCuisineSwitch = () => {
    setIsCuisineAdding(true);

    for (let i = 0; i < userCuisines.length; i++) {
      console.log(userCuisines[i])
      switch (userCuisines[i]) {
        case 'Chinese': 
        setIsChecked(prevState => ({
          ...prevState,
          chinese: true
        }));
          break;
        case 'Indian': 
        setIsChecked(prevState => ({
          ...prevState,
          indian: true
        }));
          break;
        case 'Italian': 
        setIsChecked(prevState => ({
          ...prevState,
          italian: true
        }));
          break;
        case 'African': 
        setIsChecked(prevState => ({
          ...prevState,
          african: true
        }));
          break;
        case 'Mediterranean': 
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
      <>
        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
          <label className={`btn btn-outline-primary ${isChecked.chinese ? 'active' : ''}`}>
          <input
            type="checkbox"
            name="chinese"
              className="btn-check"
            checked={isChecked.chinese}
            onChange={handleCheckboxChange}
            autoComplete='off'
          />
          Chinese
        </label>
              
              
              <br />
        <label className={`btn btn-outline-primary ${isChecked.indian ? 'active' : ''}`}>
          <input
            type="checkbox"
            name="indian"
            className="btn-check"
            checked={isChecked.indian}
            onChange={handleCheckboxChange}
            autoComplete='off'
          />
          Indian
        </label>

        <label className={`btn btn-outline-primary ${isChecked.italian ? 'active' : ''}`}>
          <input
            type="checkbox"
            name="italian"
            className="btn-check"
            checked={isChecked.italian}
            onChange={handleCheckboxChange}
            autoComplete='off'
          />
          Italian
        </label>

        <label className={`btn btn-outline-primary ${isChecked.african ? 'active' : ''}`}>
          <input
            type="checkbox"
            name="african"
            className="btn-check"
            checked={isChecked.african}
            onChange={handleCheckboxChange}
            autoComplete='off'
          />
          African
        </label>

        <label className={`btn btn-outline-primary ${isChecked.mediterranean ? 'active' : ''}`}>
          <input
            type="checkbox"
            name="mediterranean"
            className="btn-check"
            checked={isChecked.mediterranean}
            onChange={handleCheckboxChange}
            autoComplete='off'
          />
          Mediterranean
        </label>

      <br />
        </div> 
        <button className="btn btn-primary mr-left confirm-btn" onClick={confirmHandler}>Confirm Cuisines</button>
        </>
        : 
        // second component, if false
        <div>
        <ul className='mt-2 list-group list-group-horizontal cuisines'>
        {userCuisines.length === 0 ? (
          <p>You have not chosen a</p>
        ) : (
          <ul className="list-group">
            {userCuisines.map((cuisine, index) => (
              <li className="d-flex align-items-center cuisine-entry list-group-item" key={index}>
                <div className='cuisine-div'>
                  {cuisine}
                </div>
              </li>
            ))}
          </ul>
        )}
      </ul>
      </div>
      }

    {isCuisineAdding ? (
            null
          ) : <button className="btn btn-primary mr-left add-cuisine-btn"onClick={addCuisineSwitch}>Add Cuisine</button>}



    </div>
  );
};

Cuisines.propTypes = {
  getCuisines: PropTypes.func.isRequired,
  userCuisinePassed: PropTypes.array.isRequired
};


export default Cuisines;
