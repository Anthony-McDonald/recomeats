import React, { useState, useEffect } from 'react';
import '../css/forum.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ForumHeader from './ForumHeader';
import ForumPostDiv from './ForumPostDiv';
import TrendingRecipeBox from './TrendingRecipeBox';

const Forum = ({ setAuth }) => {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
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
    for (const post of posts) {
      const info = await getUserInfo(post.user);
      newUserInfo[post.user] = info;
    }
    setUserInfo(newUserInfo);
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
                userName={post.title} 
                userPic={userInfo[post.user]?.profile_image || "defaultImage.png"} 
                postTitle={post.title} 
                postBody={post.body} 
                postPic={"space"} 
                upvotes={"572"}
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
