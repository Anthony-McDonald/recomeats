import React from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/trending-recipe-box.css'
import TrendingRecipe from './TrendingRecipe'

const TrendingRecipeBox = () => {

  return (
    <div id="trending-recipe-box">
        <div id="tr-title">
        <h3>We think you may like...</h3>
        </div>
        <div id="tr-entries">
        <TrendingRecipe/>
        <TrendingRecipe/>
        <TrendingRecipe/>
        <TrendingRecipe/>
        </div>
    </div>
  );
};

export default TrendingRecipeBox;
