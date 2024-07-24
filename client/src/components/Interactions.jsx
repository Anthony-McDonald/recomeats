

import React from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/forum-post-div.css'

const Interactions = ({type, id}) => {

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
  
    } catch (error) {
      console.error("Error upvoting:", error)
    }
  }


  return (
<div className="interactions">
<div className="vote interact-box">
<button onClick={() => upvote(type, id)}>vote</button></div>
<div className="comment interact-box">comments</div>
</div>
  );
};

export default Interactions;




