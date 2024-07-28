import React, { useEffect, useState } from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/comment-box.css'
import Interactions from './Interactions';

const Comment = ({comment, getUpvoteInfo}) => {
  const [username, setUsername] = useState("");
  const [upvotes, setUpvotes] = useState(0);



  useEffect(() => {
    if (comment) {
      fetchUsername(comment.user_id);
      getUpvotes();
    }
  }, [comment]);

  const getUpvotes = async () => {
    const upvoteNumber = await getUpvoteInfo(comment.comment_id, "comment");
    setUpvotes(upvoteNumber.count);
};

  const fetchUsername = async (user_id) => {
    let parseRes;
    try {
      const url = new URL("http://localhost:5000/users/getuser/username");

      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token")
        }
      });

      parseRes = await response.json();
      setUsername(parseRes.user_name)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div id="comment-box">
        <div id="msg-info">
          <img src="/images/1.jpg" className='usr-img' alt="usr" />
          <h5 className='txt-usr-name'>{username}</h5>
          <p id="timestamp">{comment.created_at}</p>
        </div>
        <div id="msg-text">{comment.body}</div>
        <div id="interactions">
        <Interactions type={"comment"} post_id={comment.comment_id} upvotes={upvotes} getUpvotes={getUpvotes}/>
        </div>
    </div>
  );
};

export default Comment;
