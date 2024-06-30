using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{

public class RecipeIngredient
{
    [Key]
    public int IngredientId { get; set; }

    [ForeignKey("Recipe")]
    public int RecipeId { get; set; }

    [MaxLength(50)]
    public string IngredientName { get; set; }

    public Recipe Recipe { get; set; }
}
}