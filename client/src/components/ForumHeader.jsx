import React from 'react';
import '../css/forum-header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ForumHeadUser from './ForumHeadUser'

const ForumHeader = () => {

    return (
        <div id="forum-header">
            <div className="logo">
            <img class="reco-logo" id="forum-reco-logo" src="/images/recomeats.png" alt="reco-logo"></img>
            <h5 className='reco-logo-subtext'>forums</h5>
            </div>
                <ForumHeadUser/>

        </div>
    )
}

export default ForumHeader;