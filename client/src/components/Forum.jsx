import { useState, useEffect } from 'react';
import '../css/forum.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForumHeader from './ForumHeader';
import ForumPostDiv from './ForumPostDiv';
import TrendingRecipeBox from './TrendingRecipeBox';

const Forum = ({ setAuth, getUserInfo, getImageName, getUpvoteInfo, addNotif}) => {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [upvoteInfo, setUpvoteInfo] = useState({});
  const [imageInfo, setImageInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getPosts();
      verifyAuthentication();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      fetchUserInfo();
      fetchUpvotes();
      fetchImageInfo(); 
    }
  }, [posts]);

  const fetchUserInfo = async () => {
    const newUserInfo = {};
    const userPromises = posts.map(async post => {
      const info = await getUserInfo(post.user);
      newUserInfo[post.user] = info;
    });
    await Promise.all(userPromises);
    setUserInfo(newUserInfo);
  };

  const fetchUpvotes = async () => {
    const newUpvoteInfo = {};
    const upvotePromises = posts.map(async post => {
      const upvote = await getUpvoteInfo(post.post_id, "post");
      newUpvoteInfo[post.post_id] = upvote;
    });
    await Promise.all(upvotePromises);
    setUpvoteInfo(newUpvoteInfo);
  };

  const fetchImageInfo = async () => {
    const newImageInfo = {};
    const imagePromises = posts
      .filter(post => post.image_id) 
      .map(async post => {
        const imageUrl = await getImageName(post.image_id);
        newImageInfo[post.image_id] = imageUrl;
      });
    await Promise.all(imagePromises);
    setImageInfo(newImageInfo);
    setIsLoading(false);
  };

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/forum/threadlist", {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();
      setPosts(parseRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const verifyAuthentication = async () => {
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
  };

  return (
    <div id='forum-div'>
      <ForumHeader getUserInfo={getUserInfo} getPosts={getPosts}/>
      {/* <div className="forum-sort-post">
          <button type="button" className="btn btn-primary">Sort</button>
      </div> */}
      <div id="forum-main">
        <div className="post-divs">
          {isLoading ? (
            <p>No posts currently, add one yourself!</p>
          ) : (
            posts.map((post, index) => {
              const user = userInfo[post.user] || {};
              const upvote = upvoteInfo[post.post_id] || {};
              const postImage = post.image_id ? imageInfo[post.image_id] : 'default-image.jpg';

              return (
                <ForumPostDiv
                  key={index}
                  firstName={user.first_name || 'Anonymous'}
                  lastName={user.last_name || ''}
                  userPic={user.profile_image || 'default-image.jpg'}
                  postTime={post.created_at}
                  postTitle={post.title}
                  postBody={post.body}
                  postPic={postImage}
                  upvotes={upvote.count || 0}
                  post_id={post.post_id}
                  getUpvotes={fetchUpvotes}
                  addNotif={addNotif}
                  
                />
              );
            })
          )}
        </div>
        <div id="trending-recipes">
          <TrendingRecipeBox posts={posts} imageInfo={imageInfo}/>
        </div>
      </div>
    </div>
  );
};

export default Forum;
