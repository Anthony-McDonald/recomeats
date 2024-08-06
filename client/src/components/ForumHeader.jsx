import '../css/forum-header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ForumHeadUser from './ForumHeadUser'
import PostModal from './PostModal';
import { useNavigate } from 'react-router-dom';

const ForumHeader = ({getUserInfo, getPosts}) => {

    const navigate = useNavigate();

    return (
        <div id="forum-header">
            <div className="logo">
            <img className="reco-logo" id="forum-reco-logo" src="/images/recomeats.png" alt="reco-logo"></img>
            <h5 className='reco-logo-subtext'>forums</h5>
            </div>
            <div className='forum-side'>
            <div className="postbox">
            {/* Create a post */}
          <PostModal getPosts={getPosts}/>
        </div>
        {/* User profile picture */}
            <ForumHeadUser getUserInfo={getUserInfo}/>
            <button id="back-btn" className='btn-primary btn' onClick={() => navigate(-1)}>back</button>
            </div>


        </div>
    )
}

export default ForumHeader;