import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/satisfied-customers.css'
import CustomerReviewBlock from './CustomerReviewBlock';

// No comments here, self explanatory, shows customer review blocks
const SatisfiedCustomers = () => {
  return (
    <>
    <h3 className='satisfied-title playfair-display'>Here are just a few of our satisfied customers</h3>
    <div id="satisfied-customers-div">
        <div className="customer-layout">
        <br />
        <CustomerReviewBlock personImage={"ben.jpg"} personName={"Bennett Sherman"} personReview={"I have so much free time ever since I started using Recom-eats, it has changed my life completely"}></CustomerReviewBlock>
        <CustomerReviewBlock personImage={"yao.jpg"} personName={"Yao Jinjing"} personReview={"Imagine not having to think about what you want for food ever, this does that. Life changing!!!"}></CustomerReviewBlock>
        <CustomerReviewBlock personImage={"mel.jpg"} personName={"Melanie Collier"} personReview={"Before Recomeats I would eat the same thing for dinner every day. My tastebuds have never been so fulfilled!"}></CustomerReviewBlock>
        </div>


    </div>
    </>
  );
};

export default SatisfiedCustomers;
