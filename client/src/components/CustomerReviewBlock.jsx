import React from 'react';
import '../css/customer-review-block.css';

const CustomerReviewBlock = ({ personImage, personName, personReview }) => {
    // Construct the image source path
    const personImageSrc = `../../../public/images/profiles/${personImage}`;
    console.log(personImageSrc);

    // Construct the alt text
    const altText = "Image: " + personName;

    return (
        <div id="customer-review-div">
            <div className="img-holder">
                {/* Use the constructed image source path */}
                <img className="person-img" src={personImageSrc} alt={altText} />
            </div>
            <div className="review-holder">
                <h1 className='review-name playfair-display'>{personName}</h1>
                <h5 className='review-body helvetica'>{personReview}</h5>
            </div>
        </div>
    );
};

export default CustomerReviewBlock;
