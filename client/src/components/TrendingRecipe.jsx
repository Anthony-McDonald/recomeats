import React from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/trending-recipe-box.css'

const TrendingRecipe = () => {

  return (
    <div id="trending-recipe">
        <img className='trending-recipe-img' src="/images/1.jpg" alt="e23e2" />
        <div id="tr-layout">
        <h5 className='tr-title'>Title text</h5>
        <p>description of recipe</p>
        </div>

    </div>
  );
};

export default TrendingRecipe;
