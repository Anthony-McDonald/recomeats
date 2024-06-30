using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
 [Route("[controller]")]
    [ApiController]
    [Authorize] 
    public class RecipesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RecipesController(AppDbContext context)
        {
            _context = context;
        }

        // POST: recipes/addrecipe
        [HttpPost("addrecipe")]
        public async Task<ActionResult<Recipe>> AddRecipe(Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRecipe), new { id = recipe.RecipeId }, recipe);
        }

        // DELETE: recipes/deleterecipe/{recipeId}
        [HttpDelete("deleterecipe/{recipeId}")]
        public async Task<IActionResult> DeleteRecipe(int recipeId)
        {
            var recipe = await _context.Recipes.FindAsync(recipeId);
            if (recipe == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: recipes/changerecipe/{recipeId}
        [HttpPost("changerecipe/{recipeId}")]
        public async Task<IActionResult> ChangeRecipe(int recipeId, Recipe recipe)
        {
            if (recipeId != recipe.RecipeId)
            {
                return BadRequest();
            }

            _context.Entry(recipe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipeExists(recipeId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // GET: recipes/getrecipes
        [HttpGet("getrecipes")]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
        {
            return await _context.Recipes.ToListAsync();
        }

        // GET: recipes/getingredients/{recipeId}
        [HttpGet("getingredients/{recipeId}")]
        public async Task<ActionResult<IEnumerable<string>>> GetIngredients(int recipeId)
        {
            var ingredients = await _context.RecipeIngredients
                .Where(ri => ri.RecipeId == recipeId)
                .Select(ri => ri.IngredientName)
                .ToListAsync();

            return Ok(ingredients);
        }

        private bool RecipeExists(int id)
        {
            return _context.Recipes.Any(e => e.RecipeId == id);
        }
    }
}