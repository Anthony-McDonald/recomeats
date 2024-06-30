using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
public class CuisinePreference
{
    [Key]
    public int PreferenceId { get; set; }

    [Required]
    [MaxLength(50)]
    public string PreferenceName { get; set; }

    public ICollection<UserCuisinePreference> UserCuisinePreferences { get; set; }
}
}