import React, { useState, useEffect } from 'react';
import '../css/forum.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ForumHeader from './ForumHeader';
import ForumPostDiv from './ForumPostDiv';
import TrendingRecipeBox from './TrendingRecipeBox';

const Forum = ({ setAuth }) => {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [upvoteInfo, setUpvoteInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    const fetchData = async () => {
      await getPosts(); // Fetch posts first
    };

    fetchData();
    verifyAuthentication();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      fetchUserInfo(); // Fetch user info only after posts are fetched
    }
  }, [posts]); // Dependency on posts array

  async function fetchUserInfo() {
    const newUserInfo = {};
    const newUpvoteInfo = {};
    for (const post of posts) {
      const info = await getUserInfo(post.user);
      newUserInfo[post.user] = info;
      const upvote = await getUpvoteInfo(post.post_id)
      newUpvoteInfo[post.post_id] = upvote
    }
    setUserInfo(newUserInfo);
    setUpvoteInfo(newUpvoteInfo)
    setIsLoading(false); // Set isLoading to false when data is fetched
  }

  async function getPosts() {
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
  }

  async function getUserInfo(id) {
    let parseRes
    try {
      const response = await fetch("http://localhost:5000/users/getuser/profile", {
        method: "GET",
        headers: { token: localStorage.getItem("token"),
        params: {user_id: id},
         }
      });

      parseRes = await response.json();
      return parseRes
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getUpvoteInfo(id) {
    let parseRes
    try {
      const response = await fetch("http://localhost:5000/forum/upvotecount", {
        method: "GET",
        headers: { token: localStorage.getItem("token"),
        params: {type_upvoted: "post", upvoted_id: id},
         }
      });

      parseRes = await response.json();
      return parseRes
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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

  return (
    <div id='forum-div'>
      <ForumHeader/>
      <div className="forum-sort-post">
        <div className="sortbox">
          <button type="button" className="btn btn-primary">Sort By</button>
        </div>
        <div className="postbox">
          <button type="button" className="btn btn-primary">Post</button>
        </div>
      </div>
      <div id="forum-main">
        <div className="post-divs">
          {isLoading ? ( // Conditionally render based on isLoading
            <p>Loading...</p>
          ) : (
            posts.map((post, index) => (
              <ForumPostDiv 
                key={index} 
                firstName={userInfo[post.user].first_name}
                lastName={userInfo[post.user].last_name} 
                userPic={userInfo[post.user]?.profile_image || "defaultImage.png"} 
                postTitle={post.title} 
                postBody={post.body} 
                postPic={"space"} 
                upvotes={upvoteInfo[post.post_id].count}
                post_id={post.post_id}
              />
            ))
          )}
        </div>
        <div id="trending-recipes">
          <TrendingRecipeBox/>
        </div>
      </div>
    </div>
  );
};

export default Forum;
