

import React, { useEffect } from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/interaction.css'
import { useState } from 'react';
import CommentModal from './CommentModal';

const Interactions = ({type, post_id, getUpvotes, upvotes, commentBodyResult, registerComment, postReply}) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [nextStage, setNextStage] = useState("");

  useEffect(() => {
    getUpvoteStatus(post_id)
      switch (type) {
    case "post":
      setNextStage("comment");
      break;
    case "comment":
      setNextStage("reply");
      break;
    case "reply":
      setNextStage("reply");
      break;
  }
  }, []);

  const goToThread = (path) => {

      window.location = "/forum/thread/" + path
  }
  
  const getUpvoteStatus = async () => {
    let parseRes;
    try {
      const url = new URL("http://localhost:5000/forum/hasupvoted");
      url.searchParams.append("type_upvoted", type);
      url.searchParams.append("upvoted_id", post_id);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token")
        }
      });

      parseRes = await response.json();
      setIsUpvoted(parseRes)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  async function upvote(type, id) {
  try {
    const requestBody = JSON.stringify({
      type_upvoted: type,
      upvoted_id: id,
    })
    await fetch("http://localhost:5000/forum/upvote", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      },
      body: requestBody
    });
    getUpvotes()
    getUpvoteStatus(id)

  } catch (error) {
    console.error("Error upvoting:", error)
  }
}


return (
  <div className="interactions">
    <div>
      <button className='vote interact-box' onClick={() => upvote(type, post_id)}>
        <img
          className='upvote-arrow'
          src={isUpvoted ? "/images/svgs/up-arrow-filled.svg" : "/images/svgs/up-arrow.svg"}
          alt="Upvote"
        />
        {typeof upvotes === 'object' && upvotes.count !== undefined ? upvotes.count : upvotes}
      </button>
    </div>
    {type === "post" ? (    <button className='vote interact-box' onClick={() => goToThread(post_id)}>comments</button>) :
     (<CommentModal postReply={postReply} modalId={post_id} parent_id={post_id} type={nextStage} commentBodyResult={commentBodyResult} registerComment={registerComment}/>)}
  </div>
);

};

export default Interactions;




