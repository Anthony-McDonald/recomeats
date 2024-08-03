import { useEffect, useState } from 'react';
import '../css/header.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/comment-box.css';
import Interactions from './Interactions';

const Comment = ({ comment, getUpvoteInfo, level = 0, postReply, getUserInfo, addNotif, original_post_id}) => {
  const [username, setUsername] = useState("");
  const [upvotes, setUpvotes] = useState(0);
  const [type, setType] = useState("");
  const [idPassed, setIdPassed] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [madeUserImage, setMadeUserImage] = useState("");

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
      getUserInfo(comment.user_id).then((user) => {
        setUserInfo(user);
        if (user && user.profile_image) {
          setMadeUserImage("/images/profile-images/" + user.profile_image + ".png");
        }
      });
    }
  }, [comment, level, getUserInfo]);

  useEffect(() => {
    if (type && idPassed !== null) {
      getUpvotes();
    }
  }, [type, idPassed]);

  const getUpvotes = async () => {
    const upvoteNumber = await getUpvoteInfo(idPassed, type);
    setUpvotes(upvoteNumber.count);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

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
          {userInfo && madeUserImage && (
            <img src={madeUserImage} className="usr-img" alt="usr" />
          )}
          <h5 className="txt-usr-name">{username}</h5>
          <p id="timestamp">{formatDate(comment.created_at)}</p>
        </div>
        <div id="msg-text">{comment.body}</div>
        <div id="interactions">
          {type && idPassed !== null ? (
            <Interactions type={type} post_id={idPassed} upvotes={upvotes} getUpvotes={getUpvotes} postReply={postReply} addNotif={addNotif} original_post_id={original_post_id}/>
          ) : (
            <p>Loading interactions...</p>
          )}
        </div>
      </div>
      {comment.replies.map((reply, index) => (
        <Comment key={index} comment={reply} getUpvoteInfo={getUpvoteInfo} level={level + 1} postReply={postReply} getUserInfo={getUserInfo} addNotif={addNotif} original_post_id={original_post_id} />
      ))}
    </div>
  );
};

export default Comment;
