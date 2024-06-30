using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;
public class User
{
    [Key]
    public int UserId { get; set; }

    [Required]
    [MaxLength(50)]
    public string UserName { get; set; }

    [Required]
    [MaxLength(50)]
    public string EmailAddress { get; set; }

    [Required]
    [MaxLength(128)]
    public string PasswordHash { get; set; }

    [Required]
    [MaxLength(32)]
    public string PasswordSalt { get; set; }

    public UserProfile UserProfile { get; set; }
    public UserPermission UserPermission { get; set; }
    public ICollection<UserCuisinePreference> UserCuisinePreferences { get; set; }
    public ICollection<Recipe> Recipes { get; set; }
}
