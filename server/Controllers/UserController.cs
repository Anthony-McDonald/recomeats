using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using server.Data;
using server.Models;
using BCrypt.Net;
using System;
using System.Linq;

namespace YourNamespace.Controllers
{
    [Route("users/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // POST: users/dashboard
        [HttpPost("dashboard")]
        [Authorize]
        public async Task<IActionResult> Dashboard()
        {
            var userId = User.FindFirst("id")?.Value;

            var user = await _context.Users
                .Where(u => u.UserId.ToString() == userId)
                .Select(u => new { u.UserName })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST: users/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegistrationDto registrationDto)
        {
            var salt = BCrypt.Net.BCrypt.GenerateSalt();
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(registrationDto.Password, salt);

            var newUser = new User
            {
                UserName = registrationDto.UserName,
                EmailAddress = registrationDto.EmailAddress,
                PasswordHash = passwordHash,
                PasswordSalt = salt
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            var newUserProfile = new UserProfile
            {
                UserId = newUser.UserId,
                FirstName = registrationDto.FirstName,
                LastName = registrationDto.LastName,
                DateOfBirth = registrationDto.DateOfBirth
            };

            _context.UserProfiles.Add(newUserProfile);
            await _context.SaveChangesAsync();

            var newUserPermission = new UserPermission
            {
                UserId = newUser.UserId,
                PermissionLevel = registrationDto.PermissionLevel
            };

            _context.UserPermissions.Add(newUserPermission);
            await _context.SaveChangesAsync();

            var jwtToken = JwtGenerator.GenerateToken(newUser.UserId);

            return Ok(new { jwtToken });
        }

        // POST: users/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto loginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.EmailAddress == loginDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            {
                return Unauthorized("Password or Email is incorrect");
            }

            var token = JwtGenerator.GenerateToken(user.UserId);

            return Ok(new { token });
        }

        // GET: users/is-verify
        [HttpGet("is-verify")]
        [Authorize]
        public IActionResult IsVerify()
        {
            return Ok(true);
        }

        // DELETE: users/deleteuser
        [HttpDelete("deleteuser")]
        [Authorize]
        public async Task<IActionResult> DeleteUser()
        {
            var userId = User.FindFirst("id")?.Value;
            var userGuid = Guid.Parse(userId);

            var user = await _context.Users.FindAsync(userGuid);

            if (user == null)
            {
                return NotFound();
            }

            _context.UserProfiles.RemoveRange(_context.UserProfiles.Where(up => up.UserId == userGuid));
            _context.UserPermissions.RemoveRange(_context.UserPermissions.Where(up => up.UserId == userGuid));
            _context.UserCuisinePreferences.RemoveRange(_context.UserCuisinePreferences.Where(ucp => ucp.UserId == userGuid));
            _context.RecipeIngredients.RemoveRange(_context.RecipeIngredients.Where(ri => _context.Recipes.Any(r => r.UserId == userGuid && r.RecipeId == ri.RecipeId)));
            _context.Recipes.RemoveRange(_context.Recipes.Where(r => r.UserId == userGuid));
            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: users/edituser
        [HttpPost("edituser")]
        [Authorize]
        public async Task<IActionResult> EditUser(EditUserDto editUserDto)
        {
            var userId = User.FindFirst("id")?.Value;
            var userGuid = Guid.Parse(userId);

            var user = await _context.Users.FindAsync(userGuid);

            if (user == null)
            {
                return NotFound();
            }

            user.UserName = editUserDto.UserName;
            user.EmailAddress = editUserDto.EmailAddress;
            user.PasswordHash = editUserDto.PasswordHash;

            _context.Entry(user).State = EntityState.Modified;

            var userProfile = await _context.UserProfiles.FirstOrDefaultAsync(up => up.UserId == userGuid);
            if (userProfile != null)
            {
                userProfile.FirstName = editUserDto.FirstName;
                userProfile.LastName = editUserDto.LastName;
                userProfile.DateOfBirth = editUserDto.DateOfBirth;
                _context.Entry(userProfile).State = EntityState.Modified;
            }

            var userPermission = await _context.UserPermissions.FirstOrDefaultAsync(up => up.UserId == userGuid);
            if (userPermission != null)
            {
                userPermission.PermissionLevel = editUserDto.PermissionLevel;
                _context.Entry(userPermission).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                user,
                profile = userProfile,
                permission = userPermission
            });
        }

        // GET: users/getuser/profile
        [HttpGet("getuser/profile")]
        [Authorize]
        public async Task<IActionResult> GetUserProfile()
        {
            var userId = User.FindFirst("id")?.Value;
            var userGuid = Guid.Parse(userId);

            var userProfile = await _context.UserProfiles
                .Where(up => up.UserId == userGuid)
                .Select(up => new
                {
                    up.FirstName,
                    up.LastName,
                    DateOfBirth = up.DateOfBirth.ToShortDateString()
                })
                .FirstOrDefaultAsync();

            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }
    }
}
