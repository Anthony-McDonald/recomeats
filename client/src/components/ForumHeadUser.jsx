import React, { useState, useEffect } from 'react';
import '../css/forum-header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 

const ForumHeadUser = ({getUserInfo}) => {
    const [fullProfileUrl, setFullProfileUrl] = useState("")


    useEffect(() => {
        const fetchData = async () => {
            try {
                const imageNum = await getUserInfo();
                const fullUrlToBe = "/images/profile-images/" + imageNum.profile_image + ".png"
                setFullProfileUrl(fullUrlToBe)
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchData();
    }, []);
        
    return (
        <>
        <div className="user-div">
            <img className='usr-img' src={fullProfileUrl} alt="usr-prof-img" />
        </div>
        </>
    )
}

export default ForumHeadUser;