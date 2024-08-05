import '../css/customer-review-block.css';

const CustomerReviewBlock = ({ personImage, personName, personReview }) => {
    // Create path to img
    const personImageSrc = `/images/profiles/${personImage}`;

    const altText = "Image: " + personName;

    // Component returned
    return (
        <div id="customer-review-div">
            <div className="img-holder">
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
