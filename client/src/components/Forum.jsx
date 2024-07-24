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
      const upvote = await getUpvoteInfo(post.post_id);
      newUpvoteInfo[post.post_id] = upvote;
    });
    await Promise.all(upvotePromises);
    setUpvoteInfo(newUpvoteInfo);
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

  const getUserInfo = async (id) => {
    let parseRes;
    try {
      const url = new URL("http://localhost:5000/users/getuser/profile");
      url.searchParams.append("user_id", id);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token")
        }
      });

      parseRes = await response.json();
      return parseRes;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUpvoteInfo = async (id) => {
    let parseRes;
    try {
      const url = new URL("http://localhost:5000/forum/upvotecount");
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
      return parseRes;
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
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            posts.map((post, index) => (
              <ForumPostDiv
                key={index}
                firstName={userInfo[post.user]?.first_name || 'Anonymous'}
                lastName={userInfo[post.user]?.last_name || ''}
                userPic={userInfo[post.user]?.profile_image || "defaultImage.png"}
                postTitle={post.title}
                postBody={post.body}
                postPic={"space"}
                upvotes={upvoteInfo[post.post_id]?.count || 0}
                post_id={post.post_id}
                getUpvotes={fetchUpvotes}
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
