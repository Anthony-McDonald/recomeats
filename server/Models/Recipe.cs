using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
public class Recipe
{
    [Key]
    public int RecipeId { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    [MaxLength(50)]
    public string RecipeName { get; set; }

    [MaxLength(250)]
    public string RecipeDescription { get; set; }

    [MaxLength(500)]
    public string RecipeInstructions { get; set; }

    public User User { get; set; }
    public ICollection<RecipeIngredient> RecipeIngredients { get; set; }
}
}