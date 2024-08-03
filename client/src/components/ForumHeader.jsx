import '../css/forum-header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ForumHeadUser from './ForumHeadUser'
import PostModal from './PostModal';

const ForumHeader = ({getUserInfo, getPosts}) => {

    function goTo() {
        const currentUrl = window.location.href;
        if (currentUrl.includes("/thread")) {
            window.location.href = "/forum";
        } else {
            const newUrl = currentUrl.replace('/forum', '')
            window.location.href = newUrl;
        }

      }

    return (
        <div id="forum-header">
            <div className="logo">
            <img className="reco-logo" id="forum-reco-logo" src="/images/recomeats.png" alt="reco-logo"></img>
            <h5 className='reco-logo-subtext'>forums</h5>
            </div>
            <div className='forum-side'>
            <div className="postbox">
          <PostModal getPosts={getPosts}/>
        </div>
            <ForumHeadUser getUserInfo={getUserInfo}/>
            <button id="back-btn" className='btn-primary btn' onClick={() => goTo()}>back</button>
            </div>


        </div>
    )
}

export default ForumHeader;