using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
public class UserCuisinePreference
{
    [ForeignKey("User")]
    public int UserId { get; set; }

    [ForeignKey("CuisinePreference")]
    public int PreferenceId { get; set; }

    public User User { get; set; }
    public CuisinePreference CuisinePreference { get; set; }
}
}