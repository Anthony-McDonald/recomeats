import '../css/recipe-box.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 

const RecipeBox = ({recipe, deleteRecipe, editRecipe}) => {
    const {recipe_id, recipe_name, recipe_description} = recipe;

    const handleDelete = () => {
        deleteRecipe(recipe_id);
    }

  return (
    <div id="recipe-box">
        <div className="recipe-info">
        <div className="recipe-name">
        {recipe_name}
        </div>
        <div className="recipe-description">
        {recipe_description}
        </div>
        </div>
        <div className="control-div">
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => editRecipe(recipe_id)}>Edit</button>
        </div>



    </div>
  );
};

export default RecipeBox;
