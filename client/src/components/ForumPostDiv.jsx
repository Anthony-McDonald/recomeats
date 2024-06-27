import React from 'react';
import '../css/forum-post-div.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Interactions from './Interactions'

const ForumPostDiv = () => {

    return (
        <div className='post-div'>
            <div className="pd-top">
            <img className='usr-img-post' src="/images/1.jpg" alt="usr-prof-img" />
            <h5 className='pdtop-user'>pdtoptext</h5>
            </div>
            <div className="pd-bot">
                <div className="pd-bl">
                <h4 className='pd-title'>Succulent Tomato Carbonara</h4>
                <div className="post-desc-div">
                <p id='post-description'>Wow this food is so lovely rro woooooooooooooooooooo i 32uhe2ueh 3eh2ieu32eh32 3iuhuihe32u  32e23eu32e2h3ei32u e32heiu23he32iuh e32he3iu2eh23ih</p>
                </div>
                <Interactions/>
                </div>
                <div className="pd-br">
                    <img className='food-primary-img' src="/images/1.jpg" alt="img" />
                </div>
            </div>
        </div>
    )
}

export default ForumPostDiv;