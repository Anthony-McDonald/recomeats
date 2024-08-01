import React, { useState } from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/trending-recipe-box.css'
import TrendingRecipe from './TrendingRecipe'

const TrendingRecipeBox = ({posts, imageInfo}) => {
  const [isLoading, setIsLoading] = useState(false);
  const postsToShow = posts.slice(0, 3);
  return (
    <div id="trending-recipe-box">
        <div id="tr-title">
        <h3>We think you may like...</h3>
        </div>
        <div id="tr-entries">
        {isLoading ? (
            <p>Loading...</p>
          ) : (
            postsToShow.map((post, index) => {
              const postImage = post.image_id ? imageInfo[post.image_id] : 'default-image.jpg';
              return (
                <TrendingRecipe
                  key={index}
                  postTitle={post.title}
                  postBody={post.body}
                  postPic={postImage}
                  postId = {post.post_id}
                />
              );
            })
          )}
        </div>
    </div>
  );
};

export default TrendingRecipeBox;
