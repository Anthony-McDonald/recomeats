import { useEffect, useState } from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/interaction.css'
import CommentModal from './CommentModal';

const Interactions = ({type, post_id, getUpvotes, upvotes, commentBodyResult, registerComment, postReply, addNotif, original_post_id}) => {
  const [isUpvoted, setIsUpvoted] = useState(false);

  // See whether current post has been upvoted
  useEffect(() => {
    getUpvoteStatus(post_id);
  }, []);

  // Path to the thread selected
  const goToThread = (path) => {
      window.location = "/forum/thread/" + path;
  }
  // Path to retrieve whether post upvoted
  const getUpvoteStatus = async () => {
    try {
      const url = new URL("http://localhost:5000/forum/hasupvoted");
      url.searchParams.append("type_upvoted", type);
      url.searchParams.append("upvoted_id", post_id);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token")
        }
      });

      const parseRes = await response.json();
      setIsUpvoted(parseRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Path to upvote/un-upvote posts
  async function upvote(type, id) {
    try {
      const requestBody = JSON.stringify({
        type_upvoted: type,
        upvoted_id: id,
      });
      await fetch("http://localhost:5000/forum/upvote", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
        },
        body: requestBody
      });
      getUpvotes();
      getUpvoteStatus(id);
      if (!isUpvoted) {
        addNotif(type, original_post_id, id, "upvote");
      }
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  }

  return (
    <div className="interactions">
      <div>
        {/* Upvote/Un-upvote box. Shows filled arrow if upvoted, unfilled arrow if not upvoted */}
        <button className='vote interact-box' onClick={() => upvote(type, post_id)}>
          <img
            className='upvote-arrow'
            src={isUpvoted ? "/images/svgs/up-arrow-filled.svg" : "/images/svgs/up-arrow.svg"}
            alt="Upvote"
          />
          {/* Shows number of upvotes */}
          {typeof upvotes === 'object' && upvotes.count !== undefined ? upvotes.count : upvotes}
        </button>
      </div>
      {/* Shows either a redirect to the post or a modal to reply dependent on the 'type' variable*/}
      {type === "post" ? (
        <button className='vote interact-box' onClick={() => goToThread(post_id)}>comments</button>
      ) : (
        <CommentModal
          postReply={postReply}
          modalId={post_id}
          parent_id={post_id}
          type={type}
          commentBodyResult={commentBodyResult}
          registerComment={registerComment}
        />
      )}
    </div>
  );
};

export default Interactions;
