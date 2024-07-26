import React from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/comment-box.css'
import Interactions from './Interactions';

const Comment = ({comment_id}) => {

  return (
    <div id="comment-box">
        <div id="msg-info">
          <img src="/images/1.jpg" className='usr-img' alt="usr" />
          <h5 className='txt-usr-name'>Username31323</h5>
          <p id="timestamp">5 hours ago</p>
        </div>
        <div id="msg-text">Sample comment commented by the comment man that can</div>
        <div id="interactions">
          <Interactions/>
        </div>
    </div>
  );
};

export default Comment;
