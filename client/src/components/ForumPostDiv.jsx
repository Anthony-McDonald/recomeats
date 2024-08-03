import React from 'react';
import '../css/forum-post-div.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Interactions from './Interactions'

const ForumPostDiv = ({firstName, lastName, userPic, postTime, postTitle, postBody, postPic, upvotes, post_id, getUpvotes}) => {
    const userPicSequenced = "/images/profile-images/" + userPic + ".png"
    const postPicSequenced = "http://localhost:5000/uploads/" + postPic
    const fullName = firstName + " " + lastName;
    return (
        <div className='post-div'>
            <div className="pd-top">
            <img className='usr-img-post' src={userPicSequenced} alt="usr-prof-img" />
            <h5 className='pdtop-user'>{fullName}</h5>
            <p className='posted-time'>{postTime}</p>
            </div>
            <div className="pd-bot">
                <div className="pd-bl">
                    
                <h4 className='pd-title'>{postTitle}</h4>
                <div className="post-desc-div">
                <p id='post-description'>{postBody}</p>
                </div>
                <Interactions type={"post"} post_id={post_id} upvotes={upvotes} getUpvotes={getUpvotes}/>
                </div>
                <div className="pd-br">
                    <img className='food-primary-img' src={postPicSequenced} alt=" " />
                </div>
            </div>
        </div>
    )
}

export default ForumPostDiv;