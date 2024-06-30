using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Data;
using server.Models;

namespace YourNamespace.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize] 
    public class CuisinePreferencesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CuisinePreferencesController(AppDbContext context)
        {
            _context = context;
        }

        // POST: cuisinepreferences/addcuisine
        [HttpPost("addcuisine")]
        public async Task<ActionResult<CuisinePreference>> AddCuisinePreference(CuisinePreference cuisinePreference)
        {
            _context.CuisinePreferences.Add(cuisinePreference);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCuisinePreference), new { id = cuisinePreference.PreferenceId }, cuisinePreference);
        }

        // DELETE: cuisinepreferences/deletecuisine/{cuisineId}
        [HttpDelete("deletecuisine/{cuisineId}")]
        public async Task<IActionResult> DeleteCuisinePreference(int cuisineId)
        {
            var cuisinePreference = await _context.CuisinePreferences.FindAsync(cuisineId);
            if (cuisinePreference == null)
            {
                return NotFound();
            }

            _context.CuisinePreferences.Remove(cuisinePreference);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: cuisinepreferences/getuserpreferences
        [HttpGet("getuserpreferences")]
        public async Task<ActionResult<IEnumerable<UserCuisinePreference>>> GetUserCuisinePreferences()
        {
            var user_id = int.Parse(User.FindFirst("sub")?.Value); // Example of getting user ID from token
            var preferences = await _context.UserCuisinePreferences
                .Where(ucp => ucp.UserId == user_id)
                .ToListAsync();

            return Ok(preferences);
        }

        // POST: cuisinepreferences/addusercuisine/{cuisineId}
        [HttpPost("addusercuisine/{cuisineId}")]
        public async Task<ActionResult<UserCuisinePreference>> AddUserCuisinePreference(int cuisineId)
        {
            var user_id = int.Parse(User.FindFirst("sub")?.Value); // Example of getting user ID from token
            var userCuisinePreference = new UserCuisinePreference { UserId = user_id, PreferenceId = cuisineId };

            _context.UserCuisinePreferences.Add(userCuisinePreference);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserCuisinePreference), new { id = userCuisinePreference.UserId }, userCuisinePreference);
        }

        // DELETE: cuisinepreferences/deleteusercuisine
        [HttpDelete("deleteusercuisine")]
        public async Task<IActionResult> DeleteUserCuisinePreference()
        {
            var user_id = int.Parse(User.FindFirst("sub")?.Value); // Example of getting user ID from token
            var userCuisinePreference = await _context.UserCuisinePreferences
                .Where(ucp => ucp.UserId == user_id)
                .ToListAsync();

            if (userCuisinePreference == null)
            {
                return NotFound();
            }

            _context.UserCuisinePreferences.RemoveRange(userCuisinePreference);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: cuisinepreferences/getcuisine/{cuisineId}
        [HttpGet("getcuisine/{cuisineId}")]
        public async Task<ActionResult<CuisinePreference>> GetCuisinePreference(int cuisineId)
        {
            var cuisinePreference = await _context.CuisinePreferences.FindAsync(cuisineId);

            if (cuisinePreference == null)
            {
                return NotFound();
            }

            return Ok(cuisinePreference);
        }

        private bool CuisinePreferenceExists(int id)
        {
            return _context.CuisinePreferences.Any(e => e.PreferenceId == id);
        }

        private bool UserCuisinePreferenceExists(int userId, int preferenceId)
        {
            return _context.UserCuisinePreferences.Any(ucp => ucp.UserId == userId && ucp.PreferenceId == preferenceId);
        }
    }
}
