import React from 'react';
import '../css/forum.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useEffect } from 'react';
import ForumHeader from './ForumHeader';
import ForumPostDiv from './ForumPostDiv';
import TrendingRecipeBox from './TrendingRecipeBox'

const Forum = ({setAuth}) => {

    useEffect(() => {
        verifyAuthentication();
      }, []);
  

  return (
    <div id='forum-div'>
        <ForumHeader/>
        <div className="forum-sort-post">
            <div className="sortbox">
            <button type="button" className="btn btn-primary">Sort By</button>
            </div>
            <div className="postbox">
            <button type="button" className="btn btn-primary">Post</button>
            </div>
        </div>
        {/* currentComments.map((recipe, index) => (
          <RecipeBox key={index} recipe={recipe} editRecipe={editRecipeManually} deleteRecipe={deleteRecipe}></RecipeBox>
        )) */}
        <div id="forum-main">
          <div className="post-divs">
          <ForumPostDiv/>
        <ForumPostDiv/>
        <ForumPostDiv/>
        <ForumPostDiv/>
        <ForumPostDiv/>
        <ForumPostDiv/>
        <ForumPostDiv/>
        <ForumPostDiv/>
        <ForumPostDiv/>
          </div>
          <div id="trending-recipes">
            <TrendingRecipeBox/>
          </div>
        </div>

        
    </div>
  );

  async function verifyAuthentication() {
    try {
    const response = await fetch("http://localhost:5000/users/is-verify", {
      method: "GET",
      headers: {token: localStorage.getItem("token")}
    });

    const parseRes = await response.json();
    console.log(parseRes);

    parseRes === true ? setAuth(true) : setAuth(false)


  } catch (err) {
    console.error(err.message);
  }
  }
};

export default Forum;
