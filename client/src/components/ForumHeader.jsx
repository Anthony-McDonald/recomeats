import React from 'react';
import '../css/forum-header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ForumHeadUser from './ForumHeadUser'

const ForumHeader = ({getUserInfo}) => {

    return (
        <div id="forum-header">
            <div className="logo">
            <img className="reco-logo" id="forum-reco-logo" src="/images/recomeats.png" alt="reco-logo"></img>
            <h5 className='reco-logo-subtext'>forums</h5>
            </div>
                <ForumHeadUser getUserInfo={getUserInfo}/>

        </div>
    )
}

export default ForumHeader;