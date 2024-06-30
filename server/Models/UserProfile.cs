using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
public class UserProfile
{
    [Key]
    public int ProfileId { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    [MaxLength(20)]
    public string FirstName { get; set; }

    [MaxLength(20)]
    public string LastName { get; set; }

    public DateTime DateOfBirth { get; set; }

    public User User { get; set; }
}
}