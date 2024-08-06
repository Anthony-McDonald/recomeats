import { useEffect, useState } from 'react';
import '../css/header.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/recipe-image-box.css';

const RecipeImageBox = ({ getImageName, image_id }) => {
  const [imageUrl, setImageUrl] = useState("");

  // Retrieve name of image once id is passed
  useEffect(() => {
    if (image_id) {
      fetchImageName(image_id);
    }
  }, [image_id]);

  // Path to fetch image name
  const fetchImageName = async (img_id) => {
    try {
      const imageName = await getImageName(img_id);
      setImageUrl(imageName);
    } catch (error) {
      console.error("Error fetching image name:", error);
    }
  };

  let postPicSequenced;
  if (imageUrl !== '') {
    postPicSequenced = `http://localhost:5000/uploads/${imageUrl}`;
  }

  // Show image after sequencing above
  return (
    <div id="recipe-image-box">
      {imageUrl && (
        <img className="thread-img" src={postPicSequenced} alt="Recipe" />
      )}
    </div>
  );
};

export default RecipeImageBox;
