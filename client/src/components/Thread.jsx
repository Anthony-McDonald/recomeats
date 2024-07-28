import React, { useState, useEffect } from 'react';
import '../css/forum.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useParams } from 'react-router-dom';
import ForumHeader from './ForumHeader';
import RecipeThreadDiv from './RecipeThreadDiv';
import Interactions from './Interactions';
import Comment from './Comment';
import SimilarRecipe from './SimilarRecipe';
import CommentModal from './CommentModal';

const Thread = ({ setAuth, getUserInfo, getImageName, getUpvoteInfo }) => {
  const [ingredients, setIngredients] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();

  useEffect(() => {
    verifyAuthentication();
    getUpvotes();
    fetchCommentsAndReplies(id);
  }, []);

  const registerComment = (comment) => {
    setNewComment(comment);
    postComment(id, comment);
  }

  async function postComment(post_id, commentBody) {
    try {
      const requestBody = JSON.stringify({
        post_id: post_id,
        body: commentBody,
      });
      await fetch("http://localhost:5000/forum/newcomment", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem("token"),
        },
        body: requestBody,
      });
      fetchCommentsAndReplies(id);
    } catch (error) {
      console.error("Error posting comment:", error);
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
      console.error("Error fetching ingredients:", error);
    }
  }

  const getUpvotes = async () => {
    const upvoteNumber = await getUpvoteInfo(id, "post");
    setUpvotes(upvoteNumber.count);
  };

  const fetchCommentsAndReplies = async (post_id) => {
    setIsLoading(true);
    try {
      const commentsUrl = new URL("http://localhost:5000/forum/commentlist");
      commentsUrl.searchParams.append("post_id", post_id);
      const commentsResponse = await fetch(commentsUrl, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token")
        }
      });
      const commentsRes = await commentsResponse.json();

      const fetchAllReplies = async (commentList) => {
        for (const comment of commentList) {
          const replies = await fetchReplies(comment.comment_id);
          comment.replies = replies;
        }
      };

      await fetchAllReplies(commentsRes);
      setComments(commentsRes.reverse());
    } catch (error) {
      console.error("Error fetching comments and replies:", error);
    }
    setIsLoading(false);
  };

  const fetchReplies = async (comment_id) => {
    try {
      const url = new URL("http://localhost:5000/forum/replylist");
      url.searchParams.append("comment_id", comment_id);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token")
        }
      });
      const repliesRes = await response.json();

      return repliesRes;
    } catch (error) {
      console.error("Error fetching replies:", error);
      return [];
    }
  };

  return (
    <div id='thread-div'>   
      <ForumHeader />
      <div id="thread-wrapper">
        <div id="left-sidebar-div"></div>
        <div id="thr-l">
          <RecipeThreadDiv post_id={id} getUserInfo={getUserInfo} getImageName={getImageName} getIngredients={getIngredients} ingredients={ingredients} />
          <div id="interaction-div">
            <Interactions type={"post"} post_id={id} upvotes={upvotes} getUpvotes={getUpvotes} />
            <CommentModal commentBodyResult={newComment} registerComment={registerComment} />
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              comments.map((comment, index) => (
                <Comment key={index} comment={comment} getUpvoteInfo={getUpvoteInfo} />
              ))
            )}
          </div>
        </div>
        <div id="thr-r">
          <div id="related-threads">
            <h4 className="related-title">Similar Recipes</h4>
            <SimilarRecipe ingredients={ingredients} />
          </div>
        </div>
      </div>
    </div>
  );

  async function verifyAuthentication() {
    try {
      const response = await fetch("http://localhost:5000/users/is-verify", {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });
      const parseRes = await response.json();
      setAuth(parseRes === true);
    } catch (err) {
      console.error(err.message);
    }
  }
};

export default Thread;
