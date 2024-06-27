import React from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/recipe-image-box.css'

const RecipeImageBox = () => {

  return (
    <div id="recipe-image-box">
        <img className="thread-img" src="/images/1.jpg" alt="img" />
    </div>
  );
};

export default RecipeImageBox;
