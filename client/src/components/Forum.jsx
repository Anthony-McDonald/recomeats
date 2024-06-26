import React from 'react';
import '../css/forum.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useEffect } from 'react';
import ForumHeader from './ForumHeader';
import ForumPostDiv from './ForumPostDiv';

const Forum = ({setAuth}) => {

    useEffect(() => {
        verifyAuthentication();
      }, []);
  

  return (
    <div id='forum-div'>
        <ForumHeader/>
        <div className="forum-sort-post">
            <div className="sortbox">
            <button type="button" class="btn btn-primary">Sort By</button>
            </div>
            <div className="postbox">
            <button type="button" class="btn btn-primary">Post</button>
            </div>
        </div>
        {/* currentComments.map((recipe, index) => (
          <RecipeBox key={index} recipe={recipe} editRecipe={editRecipeManually} deleteRecipe={deleteRecipe}></RecipeBox>
        )) */}
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
  );

  async function verifyAuthentication() {
    try {
    const response = await fetch("http://ec2-13-60-10-44.eu-north-1.compute.amazonaws.com:5000/users/is-verify", {
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
