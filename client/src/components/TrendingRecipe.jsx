import React, { useEffect, useState } from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/trending-recipe-box.css'

const TrendingRecipe = ({postTitle, postBody, postPic, postId}) => {
  const [postPicSequenced, setPostPicSequenced] = useState(null);

  useEffect(() => {
    setPostPicSequenced("http://localhost:5000/uploads/" + postPic)
  }, [postPic]);

  function goTo(here) {
    window.location.href = here;
  }

  return (
    <div
      id="trending-recipe"
      onClick={() => goTo(`/forum/thread/` + postId)}
    >
      <img className='trending-recipe-img' src={postPicSequenced} alt={postTitle || "Recipe image"} />
      <div id="tr-layout">
        <h5 className='tr-title'>{postTitle}</h5>
        <p>{postBody}</p>
      </div>
    </div>
  );
};

export default TrendingRecipe;
