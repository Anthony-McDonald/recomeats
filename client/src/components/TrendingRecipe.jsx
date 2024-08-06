import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/trending-recipe-box.css';

// No comments here, self explanatory. Takes in information and creates a div based off of it with an img and text
const TrendingRecipe = ({ postTitle, postBody, postPic, postId }) => {
  const navigate = useNavigate();
  const [postPicSequenced, setPostPicSequenced] = useState(null);

  useEffect(() => {
    if (postPic) { 
      setPostPicSequenced("http://localhost:5000/uploads/" + postPic);
    }
  }, [postPic]);

  function goTo(here) {
    navigate(here);
  }

  return (
    <div
      id="trending-recipe"
      onClick={() => goTo(`/forum/thread/` + postId)}
    >
      {postPicSequenced && (
        <img className='trending-recipe-img' src={postPicSequenced} alt='' />
      )}
      <div id="tr-layout">
        <h5 className='tr-title'>{postTitle}</h5>
        <p className='tr-desc'>{postBody}</p>
      </div>
    </div>
  );
};

export default TrendingRecipe;
