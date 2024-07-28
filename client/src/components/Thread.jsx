import React, { useState, useEffect } from 'react';
import '../css/forum.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useParams } from 'react-router-dom';
import ForumHeader from './ForumHeader';
import RecipeThreadDiv from './RecipeThreadDiv';
import Interactions from './Interactions';
import Comment from './Comment'
import SimilarRecipe from './SimilarRecipe';
import CommentModal from './CommentModal';

const Thread = ({setAuth, getUserInfo, getImageName, getUpvoteInfo}) => {

  const [ingredients, setIngredients] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");

  const { id } = useParams();
    useEffect(() => {
        verifyAuthentication();
        getUpvotes()
        fetchComments(id)
      }, []);


    const registerComment = (comment) => {
      setNewComment(comment)
      postComment(id, comment)
    }

    async function postComment(post_id, commentBody) {
      console.log(post_id, commentBody); // Ensure these values are correctly logged
    
      try {
        const requestBody = JSON.stringify({
          post_id: post_id,
          body: commentBody,
        });
    
        const response = await fetch("http://localhost:5000/forum/newcomment", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json', // Added Content-Type header
            'token': localStorage.getItem("token"),
          },
          body: requestBody,
        });
        fetchComments(id)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }


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
          const upvoteNumber = await getUpvoteInfo(id, "post");
          setUpvotes(upvoteNumber.count);
      };

      const fetchComments = async (post_id) => {
        let parseRes;
        try {
          const url = new URL("http://localhost:5000/forum/commentlist");
          url.searchParams.append("post_id", post_id);
    
          const response = await fetch(url, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              token: localStorage.getItem("token")
            }
          });
    
          parseRes = await response.json();
          setComments(parseRes.reverse())
        } catch (error) {
          console.error("Error fetching data:", error);
        }
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
            <CommentModal commentBodyResult={newComment} registerComment={registerComment}/>
             {isLoading ? (
            <p>Loading...</p>
          ) : (
            comments.map((comment, index) => {

              return (
                <Comment 
                key={index}
                comment={comment} getUpvoteInfo={getUpvoteInfo}/>
              );
            })
          )}
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
