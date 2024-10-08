import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/edit-info-modal.css';

const PostModal = ({ getPosts }) => {
    // Value stores for posts
    const [inputs, setInputs] = useState({
        title: "",
        body: "",
        recipe_selected: "",
        image: null,
    });
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState("");

    // Get all existing recipes for this user
    useEffect(() => {
        getRecipes();
    }, []);

    const { title, body, recipe_selected, image } = inputs;

    const onChange = (e) => {
        const { id, value } = e.target;
        setInputs({ ...inputs, [id]: value });
    };

    const onImageChange = (e) => {
        if (e.target.files.length > 0) {
            setInputs({ ...inputs, image: e.target.files[0] });
        }
    };

    // Path to get recipes for user
    async function getRecipes() {
        try {
            const response = await fetch("http://localhost:5000/recipes/getrecipes/", {
                method: "GET",
                headers: { token: localStorage.getItem("token") }
            });

            const parseRes = await response.json();
            setRecipes(parseRes);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Path to post the created post
    async function createPost(title, body, recipe_id, image_store) {
        try {
            const requestBody = JSON.stringify({
                title: title,
                body: body,
                recipe_id: recipe_id,
                image_store: image_store
            });
            await fetch("http://localhost:5000/forum/newthread", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: requestBody
            });
            getPosts();
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

    // path to upload an image

    async function imageUpload(file) {
        try {
            const formData = new FormData();
            formData.append('image', file);
            const uploadedImage = await fetch("http://localhost:5000/uploads", {
                method: "POST",
                headers: {
                    "token": localStorage.getItem("token")
                },
                body: formData
            });
            const response = await uploadedImage.json()

            return response

        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

    // Reset the form area and the error message
    function resetForm() {
        const resetInputs = {
            title: "",
            body: "",
            recipe_selected: "",
            image: null,
        };
        setInputs(resetInputs);
        setError(""); 
    }

    // On submit, if all criteria met, post and create nutritional info for posted photograph
    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError("Title is required.");
            return;
        }
        const imageName = await imageUpload(image)
        createPost(title, body, recipe_selected, imageName.imageUrl);
        gatherStats(imageName.imageUrl, recipe_selected );
        resetForm();
    };

    // Path to retrieve nutritional info from uploaded image
    const gatherStats = async (prepath, recipe_id) => {
        const imgPath = "./uploads/" + prepath;
        try {
            const url = new URL("http://localhost:5000/recog/visor");
            
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem("token")
                },
                body: JSON.stringify({ imagePath: imgPath, recipe_id: recipe_id }) // Pass the imagePath in the body
            });
    
            await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
   
    
    return (
        <>
            <button type="button" className="header-button btn btn-primary log-button" data-bs-toggle="modal" data-bs-target="#Modal">
                New Post
            </button>

            <div className="modal fade modal-cover" id="Modal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalLabel">Edit Post Details</h5>
                            <button type="button" className="header-button btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmitForm}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input value={title} onChange={onChange} type="text" className="form-control" id="title" aria-describedby="titleHelp" />
                                    {error && <div className="text-danger">{error}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="body" className="form-label">Body</label>
                                    <textarea value={body} onChange={onChange} className="form-control" id="body" rows="3"></textarea>
                                </div>
                                <div className="mb-3">
                                    {/* Dropdown area for user to select which recipe their post refers to */}
                                    <label htmlFor="recipe_selected" className="form-label">Select Recipe</label>
                                    <select value={recipe_selected} onChange={onChange} id="recipe_selected" className="form-select">
                                        <option value="">Choose a recipe</option>
                                        {recipes.map(recipe => (
                                            <option key={recipe.recipe_id} value={recipe.recipe_id}>
                                                {recipe.recipe_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Upload Image</label>
                                    <input type="file" className="form-control" id="image" accept="image/*" onChange={onImageChange}  />
                                </div>
                                <div className="submit-register">
                                    <button data-bs-dismiss="modal" type="submit" className="header-button btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="header-button btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostModal;
