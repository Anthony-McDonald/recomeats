import React from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/thread.css'
import RecipeImageBox from './RecipeImageBox';

const RecipeThreadDiv = () => {

  return (
    <div id="recipe-thread-div">
        <div id="user-box">
            <img className='usr-img' src="/images/1.jpg" alt="usr-img" />
            <h2 className='user-text'>username1234</h2>
            <p id="timestamp">5 hours ago</p>
        </div>
        <div id="thread-title">Tomatoey Amazingness, ready to take the world by storm to be honest</div>
        <div id="thread-desc">Really just made with tomato and everything</div>
        <div id="ingredients">
            <div id='ingredient' className="ingred-div">tomato</div>
            <div id='ingredient' className="ingred-div">tomato</div>
            <div id='ingredient' className="ingred-div">tomato</div>
        </div>
        <div id="recipe-images">
            <RecipeImageBox/>
        </div>

    </div>

  );
};

export default RecipeThreadDiv;
