import { useState, useEffect } from 'react';
import '../css/forum.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useParams } from 'react-router-dom';
import ForumHeader from './ForumHeader';
import RecipeThreadDiv from './RecipeThreadDiv';
import Interactions from './Interactions';
import Comment from './Comment';
import NutrientInfo from './NutrientInfo';
import CommentModal from './CommentModal';

const Thread = ({ setAuth, getUserInfo, getImageName, getUpvoteInfo, addNotif }) => {
  const [ingredients, setIngredients] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [recipe_id, setRecipeId] = useState(0);
  const { id } = useParams();

  // Fetch all info for the thread
  useEffect(() => {
    verifyAuthentication();
    getUpvotes();
    fetchCommentsAndReplies(id);
    fetchRecipeId(id);
  }, []);

  // Function to comment
  const registerComment = (comment) => {
    setNewComment(comment);
    postComment(id, comment);
  }

  // Path to post comment
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
      addNotif("post", id, post_id, "comment")
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }

  // Retrieves all comments and replies on call
  function reload() {
    fetchCommentsAndReplies(id);
  }

  // Path to get ingredients
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

  // Path to get upvotes
  const getUpvotes = async () => {
    const upvoteNumber = await getUpvoteInfo(id, "post");
    setUpvotes(upvoteNumber.count);
  };


  // Fetches comments and replies
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

  // Path to post a reply
  async function postReply(parent_id, parent_type, commentBody) {
    try {
      const requestBody = JSON.stringify({
        parent_id: parent_id,
        parent_type: parent_type,
        body: commentBody,
      });
      await fetch("http://localhost:5000/forum/newreply", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem("token"),
        },
        body: requestBody,
      });
      reload()
      addNotif(parent_type, id,parent_id, "reply")
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }

  // Path to return all replies for a particular comment
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

  // Path to retrieve recipe_id related to a post
  const fetchRecipeId = async (post_id) => {
    try {
      const url = new URL("http://localhost:5000/forum/thread/" + post_id);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token")
        }
      });

      const parseRes = await response.json();
      setRecipeId(parseRes.recipe_id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Shows data in relation to post
  return (
    <div id='thread-div'>   
      <ForumHeader getUserInfo={getUserInfo} />
      <div id="thread-wrapper">
        <div id="thr-l">
          <RecipeThreadDiv post_id={id} getUserInfo={getUserInfo} getImageName={getImageName} getIngredients={getIngredients} ingredients={ingredients}/>
          <div id="interaction-div">
            <Interactions type={"post"} post_id={id} upvotes={upvotes} getUpvotes={getUpvotes} commentBodyResult={newComment} registerComment={registerComment} postId={id} addNotif={addNotif} original_post_id={id}/>
            <CommentModal modalId={1} type={"post"} commentBodyResult={newComment} registerComment={registerComment} postReply={postReply} />
            {/* Shows all current comments */}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              comments.map((comment, index) => (
                <Comment key={index} comment={comment} getUpvoteInfo={getUpvoteInfo} getUserInfo={getUserInfo} postReply={postReply} addNotif={addNotif} original_post_id={id} />
              ))
            )}
          </div>
        </div>
        <div id="thr-r">
          <div className="nutrient-info-wrapper">
            <NutrientInfo rec_id={recipe_id}/>
          </div>
        </div>
      </div>
    </div>
  );

  // Ensures user is logged 
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
