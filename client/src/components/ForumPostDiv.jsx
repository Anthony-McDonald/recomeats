import '../css/forum-post-div.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Interactions from './Interactions';

const ForumPostDiv = ({ firstName, lastName, userPic, postTime, postTitle, postBody, postPic, upvotes, post_id, getUpvotes, addNotif }) => {
    // Create image urls to be used later
    const userPicSequenced = `/images/profile-images/${userPic}.png`;
    const postPicSequenced = `http://localhost:5000/uploads/${postPic}`;
    const fullName = `${firstName} ${lastName}`;
    // Function to turn timestamps into 'x days ago' format
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

    

    return (
        <div className='post-div'>
            <div className="pd-l">
            <div className="pd-top">
                <img className='usr-img-post' src={userPicSequenced} alt="User profile" />
                <div className="pd-user-info">
                    <h5 className='pdtop-user'>{fullName}</h5>
                    <strong className='bullet'>•</strong>
                    <p className='posted-time'>{timeBefore(postTime)}</p>
                </div>
            </div>
            <div className="pd-bot">
                <div className="pd-bl">
                    <h4 className='pd-title'>{postTitle}</h4>
                    <div className="post-desc-div">
                        <p id='post-description'>{postBody}</p>
                    </div>
                    {/* Like and reply buttons */}
                    <Interactions 
                        type="post" 
                        post_id={post_id} 
                        upvotes={upvotes} 
                        getUpvotes={getUpvotes} 
                        addNotif={addNotif} 
                        original_post_id={post_id} 
                    />
                </div>
            </div>
            </div>
            <div className="pd-br">
                    <img className='food-primary-img' src={postPicSequenced} alt=" " />
                </div>
        </div>
    );
}

export default ForumPostDiv;
