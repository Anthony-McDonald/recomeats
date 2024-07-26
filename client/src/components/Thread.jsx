import React, { useState, useEffect } from 'react';
import '../css/forum.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useParams } from 'react-router-dom';
import ForumHeader from './ForumHeader';
import RecipeThreadDiv from './RecipeThreadDiv';
import Interactions from './Interactions';
import Comment from './Comment'
import SimilarRecipe from './SimilarRecipe';

const Thread = ({setAuth, getUserInfo, getImageName, getUpvoteInfo}) => {

  const [ingredients, setIngredients] = useState([]);
  const [upvotes, setUpvotes] = useState(0);

  const { id } = useParams();
    useEffect(() => {
        verifyAuthentication();
        getUpvotes()
      }, []);


      async function getIngredients(recipe_id) {
        try {
          const response = await fetch("http://localhost:5000/recipes/getingredients/" + recipe_id, {
            method: "GET",
            headers: { token: localStorage.getItem("token") }
          });
    
          const parseRes = await response.json();
    
    
          setIngredients(parseRes);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      const getUpvotes = async () => {
          const upvoteNumber = await getUpvoteInfo(id);
          setUpvotes(upvoteNumber.count);

      };

  return (
    <div id='thread-div'>   
        <ForumHeader/>
        <div id="thread-wrapper">
        <div id="left-sidebar-div">
                </div>
            <div id="thr-l">
            <RecipeThreadDiv post_id={id} getUserInfo={getUserInfo} getImageName={getImageName} getIngredients={getIngredients} ingredients={ingredients}/>
            <div id="interaction-div">
            <Interactions type={"post"} post_id={id} upvotes={upvotes} getUpvotes={getUpvotes}/>
            <button type="button" className="btn btn-primary">Comment</button>
            {/* <Comment comment_id={1}/>
            <Comment comment_id={1}/>
            <Comment comment_id={1}/> */}
            </div>
            </div>
            <div id="thr-r">
            <div id="related-threads">
        <h4 className="related-title">
            Similar Recipes
        </h4>
        <SimilarRecipe ingredients={ingredients}/>
    </div>
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

    parseRes === true ? setAuth(true) : setAuth(false)


  } catch (err) {
    console.error(err.message);
  }
  }
};

export default Thread;
