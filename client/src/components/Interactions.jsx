

import React, { useEffect } from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/interaction.css'
import { useState } from 'react';

const Interactions = ({type, id, getUpvotes, upvotes}) => {
  const [isUpvoted, setIsUpvoted] = useState(false);

  useEffect(() => {
    getUpvoteStatus(id)
  }, []);
  
  const getUpvoteStatus = async (id) => {
    let parseRes;
    try {
      const url = new URL("http://localhost:5000/forum/hasupvoted");
      url.searchParams.append("type_upvoted", "post");
      url.searchParams.append("upvoted_id", id);

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
<button className='vote interact-box' onClick={() => upvote(type, id)}>
<img
            className='upvote-arrow'
            src={isUpvoted ? "/images/svgs/up-arrow-filled.svg" : "/images/svgs/up-arrow.svg"}
            alt="Upvote"
          />
  {upvotes}</button></div>
<button className='vote interact-box'>comments</button></div>

  );
};

export default Interactions;




