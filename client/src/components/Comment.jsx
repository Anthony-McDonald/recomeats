import { useEffect, useState } from 'react';
import '../css/header.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/comment-box.css';
import Interactions from './Interactions';

const Comment = ({ comment, getUpvoteInfo, level = 0, postReply, getUserInfo, addNotif, original_post_id}) => {
  // States
  const [username, setUsername] = useState("");
  const [upvotes, setUpvotes] = useState(0);
  const [type, setType] = useState("");
  const [idPassed, setIdPassed] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [madeUserImage, setMadeUserImage] = useState("");

  // Various effects to allow for loading of comment requirements
  useEffect(() => {
    if (comment) {
      if (level > 0) {
        setType("reply");
        setIdPassed(comment.reply_id);
      } else {
        setType("comment");
        setIdPassed(comment.comment_id);
      }
      fetchUsername(comment.user_id);
      // Here, .then is used to ensure that the userInfo and MadeUserImage are set after the userInfo is retrieved.
      getUserInfo(comment.user_id).then((user) => {
        setUserInfo(user);
        if (user && user.profile_image) {
          setMadeUserImage("/images/profile-images/" + user.profile_image + ".png");
        }
      });
    }
  }, [comment, level, getUserInfo]);

  // Ensure upvotes are gotten once type and idPassed variables are available
  useEffect(() => {
    if (type && idPassed !== null) {
      getUpvotes();
    }
  }, [type, idPassed]);

  // Retrieve upvotes
  const getUpvotes = async () => {
    const upvoteNumber = await getUpvoteInfo(idPassed, type);
    setUpvotes(upvoteNumber.count);
  };

  // Function to turn returned date format into the form of "x days ago" for example
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  function timeBefore(postTime) {
    const postTimeDate = new Date(postTime);
    const now = new Date();
    
    const secondsBefore = Math.floor((now - postTimeDate) / 1000);

    const minutesBefore = Math.floor(secondsBefore / 60);
    const hoursBefore = Math.floor(minutesBefore / 60);
    const daysBefore = Math.floor(hoursBefore / 24);
    const weeksBefore = Math.floor(daysBefore / 7);
    const monthsBefore = Math.floor(daysBefore / 30); 
    const yearsBefore = Math.floor(daysBefore / 365); 

    if (secondsBefore < 60) {
        return `${secondsBefore} seconds ago`;
    } else if (minutesBefore < 60) {
        return `${minutesBefore} minutes ago`;
    } else if (hoursBefore < 24) {
        return `${hoursBefore} hours ago`;
    } else if (daysBefore == 1) {
        return `${daysBefore} day ago`;
    } else if (daysBefore < 7 && daysBefore > 1) {
        return `${daysBefore} days ago`;
    } else if (weeksBefore < 5) {
        return `${weeksBefore} weeks ago`;
    } else if (monthsBefore < 12) {
        return `${monthsBefore} months ago`;
    } else {
        return `${yearsBefore} years ago`;
    }
}

// Retrieve username
  const fetchUsername = async (user_id) => {
    try {
      const url = new URL("http://localhost:5000/users/getuser/username");
      url.searchParams.append("user_id", user_id);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token"),
        },
      });
      const parseRes = await response.json();
      setUsername(parseRes.user_name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ marginLeft: level * 0.6 + 'rem' }}>
      <div id="comment-box">
        <div id="msg-info">
          {/* Show user profile picture */}
          {userInfo && madeUserImage && (
            <img src={madeUserImage} className="usr-img" alt="usr" />
          )}
          <h5 className="txt-usr-name">{username}</h5>
          <p id="timestamp">{timeBefore(formatDate(comment.created_at))}</p>
        </div>
        <div id="msg-text">{comment.body}</div>
        <div id="interactions">
          {/* Show interactions if they are loaded, otherwise show that they are loading */}
          {type && idPassed !== null ? (
            <Interactions type={type} post_id={idPassed} upvotes={upvotes} getUpvotes={getUpvotes} postReply={postReply} addNotif={addNotif} original_post_id={original_post_id}/>
          ) : (
            <p>Loading interactions...</p>
          )}
        </div>
      </div>
      {/* Map over comments and for each one, show the reply. This is achieved recursively */}
      {comment.replies.map((reply, index) => (
        <Comment key={index} comment={reply} getUpvoteInfo={getUpvoteInfo} level={level + 1} postReply={postReply} getUserInfo={getUserInfo} addNotif={addNotif} original_post_id={original_post_id} />
      ))}
    </div>
  );
};

export default Comment;
