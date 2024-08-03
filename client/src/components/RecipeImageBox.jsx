import { useEffect, useState } from 'react';
import '../css/header.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/recipe-image-box.css';

const RecipeImageBox = ({ getImageName, image_id }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (image_id) {
      fetchImageName(image_id);
    }
  }, [image_id]);

  const fetchImageName = async (img_id) => {
    try {
      const imageName = await getImageName(img_id);
      setImageUrl(imageName);
    } catch (error) {
      console.error("Error fetching image name:", error);
    }
  };

  const postPicSequenced = `http://localhost:5000/uploads/${imageUrl}`;

  return (
    <div id="recipe-image-box">
      {imageUrl ? (
        <img className="thread-img" src={postPicSequenced} alt="Recipe" />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default RecipeImageBox;
